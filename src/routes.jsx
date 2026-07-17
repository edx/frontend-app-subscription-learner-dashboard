import { authenticatedLoader, getAuthenticatedHttpClient } from '@openedx/frontend-base';

import {  subscriptionDashboardRole, subscriptionDashboardUrlPath, subscriptionProgramProgressRole } from './constants';
import { getSubsInitApiUrl } from './data/services/subs/urls';
import { redirect } from 'react-router-dom';

// loader to check if the user has subscription access
const subscriptionAccessLoader = async () => {
  try {
    const { data } = await getAuthenticatedHttpClient().get(getSubsInitApiUrl());

    if (!data?.userSubscription || !data.userSubscription.isSubscriber) {
      throw redirect('/learner-dashboard');  //redirect to learner dashboard if user does not have subscription access
    }
  
    return null;
  } catch (error) {
    // Let redirect responses bubble up
    if (error instanceof Response) {
      throw error;
    }

    throw redirect('/learner-dashboard'); // redirect to learner dashboard if an error occurs
  }
};

// composed loader that checks for authentication and subscription access
const protectedLoader = async (args) => {
  await authenticatedLoader(args);
  await subscriptionAccessLoader();

  return null;
};

const routes = [
  {
    id: 'org.edx.frontend.route.subsLearnerDashboard.main',
    path: subscriptionDashboardUrlPath,
    loader: protectedLoader,
    handle: {
      role: subscriptionDashboardRole
    },
    async lazy () {
      const module = await import('./Main');
      return { Component: module.default };
    },
  },
  {
    id: 'org.edx.frontend.route.subsLearnerDashboard.programProgress',
    path: '/subscription-program-progress/:uuid',
    loader: protectedLoader,
    handle: {
      role: subscriptionProgramProgressRole
    },
    async lazy () {
      const module = await import('./containers/ProgramDashboard/ProgramProgress/index');
      return { Component: module.default };
    },
  }
];

export default routes;
