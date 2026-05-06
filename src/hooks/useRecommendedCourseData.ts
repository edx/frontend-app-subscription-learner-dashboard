import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchRecommendedCourses } from '@src/data/services/subs';

type RecommendedCourseData = Awaited<ReturnType<typeof fetchRecommendedCourses>>;

type UseRecommendedCourseOptions = Omit<
  UseQueryOptions<RecommendedCourseData>,
  'queryKey' | 'queryFn'
>;

export const useRecommendedCourseData = (options?: UseRecommendedCourseOptions) => {
  return useQuery({
    queryKey: ['recommendedCourse'],
    queryFn: fetchRecommendedCourses,
    staleTime: 1000 * 60 * 5, // 5 min caching
    retry: 2,
    ...options,
  });
};
