import { authenticatedLoader } from '@openedx/frontend-base';

const routes = [
  {
    id: 'org.openedx.frontend.route.learnerDashboard.main',
    path: '/learner-dashboard',
    loader: authenticatedLoader,
    handle: {
      role: 'org.openedx.frontend.role.dashboard'
    },
    async lazy () {
      const module = await import('./Main');
      return { Component: module.default };
    },
  },
  {
    id: 'org.openedx.frontend.route.learnerDashboard.programProgress',
    path: '/program-progress/:uuid',
    loader: authenticatedLoader,
    handle: {
      role: 'org.openedx.frontend.role.programProgress'
    },
    async lazy () {
      const module = await import('./containers/ProgramsPanel/ProgramDashboard/ProgramProgress/index');
      return { Component: module.default };
    },
  }
];

export default routes;
