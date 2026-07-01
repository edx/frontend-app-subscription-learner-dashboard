import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useMasquerade } from '@src/data/context';
import GlobalDataContext from '@src/data/contexts/GlobalDataContext';
import { ProgramListData, ProgramProgressData } from '@src/containers/ProgramDashboard/data/types';
import { getTransformedCourseDataObject } from '@src/utils/dataTransformers';
import { learnerDashboardQueryKeys } from './queryKeys';
import { getProgramProgressData, getProgramsListData, initializeCourseList, initializeSubsList } from '@src/data/services/subs';

const useInitializeSubsDashboard = () => {
  const { masqueradeUser } = useMasquerade();
  const queryClient = useQueryClient();
  const { setEmailConfirmation, setPlatformSettings } = useContext(GlobalDataContext);

  const query = useQuery({
    queryKey: learnerDashboardQueryKeys.initializeSubsDashboard(masqueradeUser),
    queryFn: async () => {
      const data = await initializeSubsList(masqueradeUser);
      return {
        ...data,
        coursesByCardId: getTransformedCourseDataObject(data?.subscriptionCourses || []),
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes — dashboard data rarely changes while viewing
    retry: (failureCount, error: any) => {
      // Don't retry client errors (4xx) — they won't resolve on retry
      if (error?.response?.status >= 400 && error?.response?.status < 500) return false;
      return failureCount < 3;
    },
    retryOnMount: !masqueradeUser,
    refetchOnMount: !masqueradeUser,
  });

  // Populate shell-level GlobalDataProvider so header widgets can access this data
  useEffect(() => {
    if (query.data && !masqueradeUser) {
      if (query.data.emailConfirmation && setEmailConfirmation) {
        setEmailConfirmation(query.data.emailConfirmation);
      }
      if (query.data.platformSettings && setPlatformSettings) {
        setPlatformSettings(query.data.platformSettings);
      }
    }
  }, [masqueradeUser, query.data, setEmailConfirmation, setPlatformSettings]);

  // When masquerading fails, fall back to the normal user's cached data
  let { data } = query;
  if (masqueradeUser && query.isError) {
    data = queryClient.getQueryData(learnerDashboardQueryKeys.initializeSubsDashboard(undefined));
  }

  return { ...query, data };
};

const useInitializeSubsCourseDashboard = () => {
  const { masqueradeUser } = useMasquerade();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: learnerDashboardQueryKeys.initializeSubsCourseDashboard(masqueradeUser),
    queryFn: async () => {
      const data = await initializeCourseList(masqueradeUser);
      return {
        ...data,
        coursesByCardId: getTransformedCourseDataObject(data?.subscriptionCourses || []),
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes — dashboard data rarely changes while viewing
    retry: (failureCount, error: any) => {
      // Don't retry client errors (4xx) — they won't resolve on retry
      if (error?.response?.status >= 400 && error?.response?.status < 500) return false;
      return failureCount < 3;
    },
    retryOnMount: !masqueradeUser,
    refetchOnMount: !masqueradeUser,
  });

  // When masquerading fails, fall back to the normal user's cached data
  let { data } = query;
  if (masqueradeUser && query.isError) {
    data = queryClient.getQueryData(learnerDashboardQueryKeys.initializeSubsCourseDashboard(undefined));
  }

  return { ...query, data };
};

const useProgramsListData = () => {
  return useQuery<ProgramListData>({
    queryKey: ['programsList'],
    queryFn: getProgramsListData,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

const useProgramProgressData = (uuid: string) => {
  return useQuery<ProgramProgressData>({
    queryKey: ['programProgress', uuid],
    queryFn: () => getProgramProgressData(uuid),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 5, // 5 min caching
    retry: 2,
  });
};

export {
  useInitializeSubsDashboard,
  useInitializeSubsCourseDashboard,
  useProgramProgressData,
  useProgramsListData,
};
