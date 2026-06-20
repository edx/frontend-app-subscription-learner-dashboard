import { authenticatedLoader } from '@openedx/frontend-base';

const routes = [
  {
    id: 'org.edx.frontend.route.subsLearnerDashboard.main',
    path: '/subscription/learner-dashboard',
    loader: authenticatedLoader,
    handle: {
      role: 'org.edx.frontend.subs.role.dashboard'
    },
    async lazy () {
      const module = await import('./Main');
      return { Component: module.default };
    },
  },
  {
    id: 'org.edx.frontend.route.subsLearnerDashboard.programProgress',
    path: '/subscription/program-progress/:uuid',
    loader: authenticatedLoader,
    handle: {
      role: 'org.edx.frontend.subs.role.programProgress'
    },
    async lazy () {
      const module = await import('./containers/ProgramDashboard/ProgramProgress/index');
      return { Component: module.default };
    },
  }
];

export default routes;
