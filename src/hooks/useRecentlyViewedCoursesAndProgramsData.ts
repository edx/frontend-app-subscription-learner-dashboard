import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchRecentlyViewedCoursesAndPrograms } from '@src/data/services/subs';

type RecentlyViewedCoursesAndProgramsData = Awaited<ReturnType<typeof fetchRecentlyViewedCoursesAndPrograms>>;

type UseRecentlyViewedCoursesAndProgramsOptions = Omit<
  UseQueryOptions<RecentlyViewedCoursesAndProgramsData>,
  'queryKey' | 'queryFn'
>;

export const useRecentlyViewedCoursesAndProgramsData = (
  options?: UseRecentlyViewedCoursesAndProgramsOptions,
) => {
  return useQuery({
    queryKey: ['recentlyViewedCoursesAndPrograms'],
    queryFn: fetchRecentlyViewedCoursesAndPrograms,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    ...options,
  });
};