import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRecommendedCourseData } from './useRecommendedCourseData';
import { fetchRecommendedCourses } from '@src/data/services/subs';

jest.mock('@src/data/services/subs');

const mockedFetchRecommendedCourses = fetchRecommendedCourses as jest.MockedFunction<typeof fetchRecommendedCourses>;

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

describe('useRecommendedCourseData', () => {
  it('should fetch and return courses data successfully', async () => {
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

    mockedFetchRecommendedCourses.mockResolvedValue(mockData);

    const { result } = renderHook(() => useRecommendedCourseData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should be in loading state initially', () => {
    mockedFetchRecommendedCourses.mockResolvedValue([]);

    const { result } = renderHook(() => useRecommendedCourseData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle error state', async () => {
    mockedFetchRecommendedCourses.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useRecommendedCourseData({ retry: false }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should have correct query configuration', async () => {
    mockedFetchRecommendedCourses.mockResolvedValue([]);

    const { result } = renderHook(() => useRecommendedCourseData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
    expect(mockedFetchRecommendedCourses).toHaveBeenCalled();
  });

  it('should handle empty data response', async () => {
    mockedFetchRecommendedCourses.mockResolvedValue([]);

    const { result } = renderHook(() => useRecommendedCourseData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });
});
