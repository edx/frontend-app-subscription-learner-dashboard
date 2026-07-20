import { useMemo } from 'react';

import { useSelectSessionModal } from '@src/data/context';
import { useInitializeSubsCourseDashboard } from '@src/data/hooks';
import SelectSessionModal from '../../containers/SelectSessionModal';
import { DashboardContent } from './DashboardContent';
import DashboardModalSlot from '../../slots/DashboardModalSlot';
import PopularCoursePanel from '../PopularCoursePanel';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';

import hooks from './hooks';
import './index.scss';
import { SubscriptionBanner } from '../SubscriptionBanner';
import { DashboardTitle } from './DashboardTitle';

export const Dashboard = () => {
  const { data, isPending } = useInitializeSubsCourseDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const { selectSessionModal } = useSelectSessionModal();
  const showSelectSessionModal = selectSessionModal.cardId !== null;

  const hasCourses = useMemo(() => data?.subscriptionCourses?.length > 0, [data]);
  const hasCourseHistory = (data?.nonUpgradeableCourses?.length ?? 0) > 0;

  return (
    <div id="learnerdashboardroot">
      <main>
        <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
          <h1 className="sr-only">{pageTitle}</h1>
          {!isPending && (
            <>
              <DashboardModalSlot />
              {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
            </>
          )}
          <div id="dashboard-content" data-testid="dashboard-content">
            {isPending
              ? (<LoadingView />)
              : (
                <DashboardLayout>
                  <SubscriptionBanner />
                  <DashboardTitle />
                  <DashboardContent hasCourseHistory={hasCourseHistory} />
                  <PopularCoursePanel />
                </DashboardLayout>
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
