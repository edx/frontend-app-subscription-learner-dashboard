import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';
import Unlimited from './src/assets/Unlimited.svg';

import { subscriptionLearnerDashboardApp } from './src';

import '@openedx/frontend-base/shell/style';
import '@openedx/brand-openedx/dist/core.min.css';
import '@openedx/brand-openedx/dist/light.min.css';
import { subscriptionAccountRole, subscriptionProfileRole, subscriptionSignoutRole } from '@src/constants';

const siteConfig: SiteConfig = {
  siteId: 'learner-dashboard-dev',
  siteName: 'Learner Dashboard Dev',
  baseUrl: 'http://localhost:5000',
  lmsBaseUrl: 'http://localhost:18000',
  loginUrl: 'http://localhost:18000/login',
  logoutUrl: 'http://localhost:18000/logout',
  headerLogoImageUrl: Unlimited,

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    headerApp,
    footerApp,
    subscriptionLearnerDashboardApp
  ],
  externalRoutes: [
    {
      role: subscriptionProfileRole,
      url: 'http://localhost:1995/profile/'
    },
    {
      role: subscriptionAccountRole,
      url: 'http://localhost:1997/account/'
    },
    {
      role: subscriptionSignoutRole,
      url: 'http://localhost:18000/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
