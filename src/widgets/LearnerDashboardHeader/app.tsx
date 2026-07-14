import { App, LinkMenuItem, WidgetOperationTypes, getAppConfig } from '@openedx/frontend-base';

import { appId, subscriptionHelpRole, subscriptionSignoutRole } from '../../constants';

import ConfirmEmailBanner from './ConfirmEmailBanner';
import CoursesLink from './CoursesLink';
import DiscoverLinkMenuItem from './DiscoverLinkMenuItem';
import ProgramsLinkMenuItem from './ProgramsLinkMenuItem';
import SupportLinkMenuItem from './SupportLinkMenuItem';
import OrderHistoryLinkMenuItem from './OrderHistoryLinkMenuItem';
import messages from '@src/messages';

const app: App = {
  appId: 'org.openedx.frontend.app.learnerDashboard.header',
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.header.main.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerConfirmEmail.v1',
      op: WidgetOperationTypes.PREPEND,
      component: ConfirmEmailBanner,
    },
    {
      slotId: 'org.openedx.frontend.slot.header.primaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkCourses.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <LinkMenuItem
          label={<CoursesLink />}
          url="/"
          variant="navLink"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.primaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkPrograms.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <ProgramsLinkMenuItem
          variant="navLink"
        />
      ),
      condition: {
        callback: () => getAppConfig(appId).ENABLE_PROGRAMS === true,
      }
    },
    {
      slotId: 'org.openedx.frontend.slot.header.primaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkDiscover.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <DiscoverLinkMenuItem
          variant="navLink"
        />
      ),
    },
    {
      slotId: 'org.openedx.frontend.slot.header.secondaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkSupport.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <SupportLinkMenuItem
          variant="navLink"
        />
      ),
      condition: {
        callback: () => getAppConfig(appId).SUPPORT_URL ? true : false,
      }
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkOrderHistory.v1',
      op: WidgetOperationTypes.INSERT_BEFORE,
      relatedId: 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuLogout.v1',
      element: (
        <OrderHistoryLinkMenuItem
          variant="navLink"
        />
      ),
      condition: {
        callback: () => getAppConfig(appId).ORDER_HISTORY_URL ? true : false,
      }
    },
    {
      slotId: 'org.openedx.frontend.slot.header.desktopRight.v1',
      id: 'org.edx.frontend.widget.learnerHome.headerLinkDashboard.v1',
      op: WidgetOperationTypes.PREPEND,
      element: (
        <LinkMenuItem
          label={messages['header.user.menu.dashboard'].defaultMessage}
          url="/subscription-learner-dashboard"
          variant="navLink"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.edx.frontend.widget.header.user.menu.manageSubscription.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <LinkMenuItem
          label={messages['header.user.menu.manageSubscription'].defaultMessage}
          url="/subscription-manage"
          variant="dropdownItem"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.edx.frontend.widget.learnerDashboard.headerAuthenticatedMenuHelp.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <LinkMenuItem
          label={messages['header.user.menu.help'].defaultMessage}
          role={subscriptionHelpRole}
          variant="dropdownItem"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.edx.frontend.widget.learnerDashboard.headerAuthenticatedMenuSignOut.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <LinkMenuItem
          label={messages['header.user.menu.signOut'].defaultMessage}
          role={subscriptionSignoutRole}
          variant="dropdownItem"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.edx.frontend.widget.learnerDashboard.dashboard.v1',
      op: WidgetOperationTypes.PREPEND,
      element: (
        <LinkMenuItem
          label={messages['header.user.menu.dashboard'].defaultMessage}
          url="/subscription-learner-dashboard"
          variant="dropdownItem"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerAuthenticatedMenuLastCourse.v1',
      op: WidgetOperationTypes.PREPEND,
      element: (
        <LinkMenuItem
          label={messages['header.user.menu.lastCourse'].defaultMessage}
          url="/last-course"
          variant="dropdownItem"
        />
      )
    },
  ]
};

export default app;
