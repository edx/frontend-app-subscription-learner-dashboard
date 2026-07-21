import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { fetchPopularProducts } from '@src/utils/algoliaUtils';
import { usePopularCoursesData } from './usePopularCourses';

jest.mock('@src/utils/algoliaUtils', () => ({
  fetchPopularProducts: jest.fn(),
}));

const mockedFetchPopularProducts = fetchPopularProducts as jest.MockedFunction<
  typeof fetchPopularProducts
>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  Wrapper.displayName = 'TestQueryClientProvider';

  return Wrapper;
};

describe('usePopularCoursesData', () => {
  const mockSearchClient = {} as any;

  beforeEach(() => {
    mockedFetchPopularProducts.mockReset();
  });

  it('should fetch and return recently viewed data successfully', async () => {
    const mockData = [{
      objectID: '1',
      title: 'Test Course',
      primary_description: 'This is a test course description',
      image_url: 'https://example.com/image.jpg',
      organization_logo_override: 'https://example.com/thumbnail.jpg',
      content_type: 'Course',
    }];

    mockedFetchPopularProducts.mockResolvedValue(mockData as any);

    const { result } = renderHook(() => usePopularCoursesData(mockSearchClient, true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([
      {
        objectID: '1',
        title: 'Test Course',
        primary_description: 'This is a test course description',
        url: 'https://example.com/image.jpg',
        thumbnail: 'https://example.com/thumbnail.jpg',
        content_type: 'Course',
        product: 'Course',
        partner: '',
        weeks_to_complete: undefined,
        level: undefined,
      },
    ]);
  });

  it('should be in loading state initially', () => {
    mockedFetchPopularProducts.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => usePopularCoursesData(mockSearchClient, true), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading || result.current.isPending).toBe(true);
  });

  it('should handle error state', async () => {
    mockedFetchPopularProducts.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => usePopularCoursesData(mockSearchClient, true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should have correct query configuration', async () => {
    mockedFetchPopularProducts.mockResolvedValue([]);

    const { result } = renderHook(() => usePopularCoursesData(mockSearchClient, true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
    expect(mockedFetchPopularProducts).toHaveBeenCalled();
  });

  it('should handle empty data response', async () => {
    mockedFetchPopularProducts.mockResolvedValue([]);

    const { result } = renderHook(() => usePopularCoursesData(mockSearchClient, true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });

  it('should not fetch when search client is null', async () => {
    renderHook(() => usePopularCoursesData(null, true), {
      wrapper: createWrapper(),
    });

    expect(mockedFetchPopularProducts).not.toHaveBeenCalled();
  });
});
