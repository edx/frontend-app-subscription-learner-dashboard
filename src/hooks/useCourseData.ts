import { useInitializeSubsCourseDashboard } from '@src/data/hooks';

const useCourseData = (cardId: string) => {
  const { data } = useInitializeSubsCourseDashboard();
  return data?.coursesByCardId?.[cardId];
};

export default useCourseData;
