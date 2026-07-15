import { authenticatedLoader } from '@openedx/frontend-base';
import {  subscriptionDashboardRole, subscriptionDashboardUrlPath, subscriptionProgramProgressRole } from './constants';

const routes = [
  {
    id: 'org.edx.frontend.route.subsLearnerDashboard.main',
    path: subscriptionDashboardUrlPath,
    loader: authenticatedLoader,
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
    loader: authenticatedLoader,
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
