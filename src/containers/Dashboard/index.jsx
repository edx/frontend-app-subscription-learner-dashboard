import React, { useMemo } from 'react';

import { useSelectSessionModal } from '@src/data/context';
import { useInitializeLearnerHome } from '@src/data/hooks';
import SelectSessionModal from '../../containers/SelectSessionModal';
import CoursesPanel from '../../containers/CoursesPanel';
import DashboardModalSlot from '../../slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';
import { SubscriptionBanner } from '../SubscriptionBanner';

export const Dashboard = () => {
  const { data, isPending } = useInitializeLearnerHome();
  const { pageTitle } = hooks.useDashboardMessages();
  const { selectSessionModal } = useSelectSessionModal();
  const showSelectSessionModal = selectSessionModal.cardId !== null;

  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);
  // TODO: We can replace the below hardcoded subscriptionBannerData with the actual data from the API once we have the API ready. 
  // For now, we can use this hardcoded data to test the SubscriptionBanner component.
  const subscriptionBannerData = {
    isSubscribed: true,
    subscriptionStatus: 'trial', // can be 'active', 'cancelled', 'expired'
    subscriptionStartDate: '05/22/25',
    subscriptionEndDate: '05/22/26',
    subscriptionRenewalDate: '05/22/26',
    subscriptionRenewalPrice: '$36',
  }

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
                  <SubscriptionBanner
                    subscriptionBannerData={subscriptionBannerData}
                  />
                  <CoursesPanel />
                </DashboardLayout>
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
