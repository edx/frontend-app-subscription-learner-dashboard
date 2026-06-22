import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { fetchRecentlyViewedCoursesAndPrograms } from '@src/data/services/subs';
import { useRecentlyViewedCoursesAndProgramsData } from './useRecentlyViewedCoursesAndProgramsData';

jest.mock('@src/data/services/subs');

const mockedFetchRecentlyViewedCoursesAndPrograms = fetchRecentlyViewedCoursesAndPrograms as jest.MockedFunction<
  typeof fetchRecentlyViewedCoursesAndPrograms
>;

const createWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  Wrapper.displayName = 'TestQueryClientProvider';

  return Wrapper;
};

describe('useRecentlyViewedCoursesAndProgramsData', () => {
  it('should fetch and return recently viewed data successfully', async () => {
    const mockData = [{
      id: 1,
      title: 'Test Course',
      body: 'This is a test course description',
      url: 'https://example.com/image.jpg',
      thumbnail: 'https://example.com/thumbnail.jpg',
      isProgram: false,
      tagText: 'Professional Certificate',
      footerLabel: 'Test Category'
    }];

    mockedFetchRecentlyViewedCoursesAndPrograms.mockResolvedValue(mockData);

    const { result } = renderHook(() => useRecentlyViewedCoursesAndProgramsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should be in loading state initially', () => {
    mockedFetchRecentlyViewedCoursesAndPrograms.mockResolvedValue([]);

    const { result } = renderHook(() => useRecentlyViewedCoursesAndProgramsData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle error state', async () => {
    mockedFetchRecentlyViewedCoursesAndPrograms.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useRecentlyViewedCoursesAndProgramsData({ retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should have correct query configuration', async () => {
    mockedFetchRecentlyViewedCoursesAndPrograms.mockResolvedValue([]);

    const { result } = renderHook(() => useRecentlyViewedCoursesAndProgramsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
    expect(mockedFetchRecentlyViewedCoursesAndPrograms).toHaveBeenCalled();
  });

  it('should handle empty data response', async () => {
    mockedFetchRecentlyViewedCoursesAndPrograms.mockResolvedValue([]);

    const { result } = renderHook(() => useRecentlyViewedCoursesAndProgramsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });
});