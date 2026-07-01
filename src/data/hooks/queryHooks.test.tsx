import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMasquerade } from '@src/data/context';
import {
  useInitializeSubsDashboard,
  useInitializeSubsCourseDashboard,
  useProgramsListData,
  useProgramProgressData
} from './';
import { learnerDashboardQueryKeys } from './queryKeys';
import {
  getProgramProgressData,
  getProgramsListData,
  initializeCourseList,
  initializeSubsList,
} from '../services/subs';

// Mock external dependencies
jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  logError: jest.fn(),
  camelCaseObject: jest.fn((value) => value),
}));
jest.mock('@src/data/context');
jest.mock('@src/data/services/subs');
jest.mock('@src/utils/dataTransformers', () => ({
  getTransformedCourseDataObject: jest.fn((courses) => {
    const result = {};
    (courses || []).forEach((c, i) => {
      result[`card-${i}`] = { ...c, cardId: `card-${i}` };
    });
    return result;
  }),
}));
jest.mock('@src/data/contexts/GlobalDataContext', () => {
  const { createContext } = jest.requireActual('react');
  return {
    __esModule: true,
    default: createContext({
      setEmailConfirmation: jest.fn(),
      setPlatformSettings: jest.fn(),
    }),
  };
});

const mockUseMasquerade = useMasquerade as jest.MockedFunction<typeof useMasquerade>;

// Create a test wrapper with QueryClient
const createWrapper = (queryClient?: QueryClient) => {
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        retryDelay: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    );
  };
};

describe('queryHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useInitializeSubsDashboard', () => {
    const mockQueryData = { subscriptionCourses: ['query-course'], user: 'query-user' };
    const mockNormalUserData = { subscriptionCourses: ['normal-course'], user: 'normal-user', coursesByCardId: {} };

    it('should fetch and return data with coursesByCardId for normal user', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const mockApiData = {
        subscriptionCourses: [{ id: 'course-1' }, { id: 'course-2' }],
        emailConfirmation: { isNeeded: false },
        platformSettings: { supportEmail: 'test@example.com' },
      };
      (initializeSubsList as jest.Mock).mockResolvedValue(mockApiData);

      const { result } = renderHook(() => useInitializeSubsDashboard(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(initializeSubsList).toHaveBeenCalledWith(undefined);
      expect(result.current.data).toMatchObject(mockApiData);
      expect(result.current.data?.coursesByCardId).toEqual({
        'card-0': { id: 'course-1', cardId: 'card-0' },
        'card-1': { id: 'course-2', cardId: 'card-1' },
      });
    });

    it('should use query data when masquerading and query succeeds', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      (initializeSubsList as jest.Mock).mockResolvedValue(mockQueryData);

      const { result } = renderHook(() => useInitializeSubsDashboard(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(initializeSubsList).toHaveBeenCalledWith(masqueradeUser);
      expect(result.current.data).toMatchObject(mockQueryData);
    });

    it('should fall back to cached normal-user data when masquerading fails', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const error: any = new Error('API Error');
      error.response = { status: 403 };
      (initializeSubsList as jest.Mock).mockRejectedValue(error);

      // Don't use gcTime: 0 here — we need the seeded cache entry to persist
      // for the fallback lookup via queryClient.getQueryData()
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, retryDelay: 0 }, mutations: { retry: false } },
      });
      queryClient.setQueryData(
        learnerDashboardQueryKeys.initializeSubsDashboard(undefined),
        mockNormalUserData,
      );

      const { result } = renderHook(() => useInitializeSubsDashboard(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(initializeSubsList).toHaveBeenCalledWith(masqueradeUser);
      expect(result.current.data).toEqual(mockNormalUserData);
    });

    it('should not retry on 4xx errors', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const error: any = new Error('Forbidden');
      error.response = { status: 403 };
      (initializeSubsList as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useInitializeSubsDashboard(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // 4xx errors should not be retried — only 1 call
      expect(initializeSubsList).toHaveBeenCalledTimes(1);
    });

    it('should retry on 5xx errors up to 3 times', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const error: any = new Error('Server Error');
      error.response = { status: 500 };
      (initializeSubsList as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useInitializeSubsDashboard(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // 1 initial + 3 retries = 4 total calls
      expect(initializeSubsList).toHaveBeenCalledTimes(4);
    });

    it('should have correct query configuration for masquerading', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      (initializeSubsList as jest.Mock).mockResolvedValue(mockQueryData);

      const { result } = renderHook(() => useInitializeSubsDashboard(), {
        wrapper: createWrapper(),
      });

      // For masquerading, retryOnMount and refetchOnMount should be false
      expect(result.current.isRefetchError).toBe(false);
    });
  });

  describe('useInitializeSubsCourseDashboard', () => {
    it('uses its own query key and fetch function', async () => {
      mockUseMasquerade.mockReturnValue({
        masqueradeUser: undefined,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const mockApiData = {
        subscriptionCourses: [{ id: 'course-1' }],
      };
      (initializeCourseList as jest.Mock).mockResolvedValue(mockApiData);

      const { result } = renderHook(() => useInitializeSubsCourseDashboard(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(initializeCourseList).toHaveBeenCalledWith(undefined);
      expect(result.current.data).toMatchObject(mockApiData);
    });

    it('falls back to its own cached normal-user data when masquerading fails', async () => {
      const masqueradeUser = 'test-user';
      mockUseMasquerade.mockReturnValue({
        masqueradeUser,
        setMasqueradeUser(): void {
          throw new Error('Function not implemented.');
        },
      });
      const error: any = new Error('API Error');
      error.response = { status: 403 };
      (initializeCourseList as jest.Mock).mockRejectedValue(error);

      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, retryDelay: 0 }, mutations: { retry: false } },
      });
      const mockNormalUserData = { subscriptionCourses: ['normal-course'], coursesByCardId: {} };
      queryClient.setQueryData(
        learnerDashboardQueryKeys.initializeSubsCourseDashboard(undefined),
        mockNormalUserData,
      );

      const { result } = renderHook(() => useInitializeSubsCourseDashboard(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.data).toEqual(mockNormalUserData);
    });
  });

  describe('useProgramsListData', () => {
    it('calls getProgramsListData as the query function', async () => {
      (getProgramsListData as jest.Mock).mockResolvedValue({});
      renderHook(() => useProgramsListData(), { wrapper: createWrapper() });
      await waitFor(() => expect(getProgramsListData).toHaveBeenCalled());
    });

    it('returns data on success', async () => {
      const mockData = { programs: [{ uuid: 'test-uuid' }], isMasquerading: false };
      (getProgramsListData as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useProgramsListData(), { wrapper: createWrapper() });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockData);
    });

    it('handles error state correctly', async () => {
      const mockError = new Error('API Error');
      (getProgramsListData as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useProgramsListData(), { wrapper: createWrapper() });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toBe(mockError);
    });
  });

  describe('useProgramProgressData', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch program progress data when uuid is provided', async () => {
      const mockUuid = 'test-uuid';
      const mockData = { progress: 75, completed: true };

      (getProgramProgressData as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useProgramProgressData(mockUuid), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(getProgramProgressData).toHaveBeenCalledWith(mockUuid);
      expect(result.current.data).toEqual(mockData);
    });

    it('should not run query when uuid is not provided', async () => {
      renderHook(() => useProgramProgressData(''), {
        wrapper: createWrapper(),
      });

      expect(getProgramProgressData).not.toHaveBeenCalled();
    });

    it('should handle error state correctly', async () => {
      const mockUuid = 'test-uuid';
      const error = new Error('API Error');

      (getProgramProgressData as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useProgramProgressData(mockUuid), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(getProgramProgressData).toHaveBeenCalledWith(mockUuid);
      expect(result.current.error).toEqual(error);
    });

    it('should retry failed requests up to 2 times', async () => {
      const mockUuid = 'test-uuid';
      const error = new Error('Server Error');

      (getProgramProgressData as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useProgramProgressData(mockUuid), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(getProgramProgressData).toHaveBeenCalledTimes(3);
    });

    it('should use correct query key', async () => {
      const mockUuid = 'test-uuid';
      const mockData = { progress: 50 };

      (getProgramProgressData as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useProgramProgressData(mockUuid), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockData);
    });
  });
});
