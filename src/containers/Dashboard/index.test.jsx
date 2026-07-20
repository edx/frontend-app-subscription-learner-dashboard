import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { useSelectSessionModal } from '@src/data/context';
import { useInitializeSubsCourseDashboard } from '@src/data/hooks';

import hooks from './hooks';
import Dashboard from '.';

jest.mock('@src/data/context', () => ({
  useSelectSessionModal: jest.fn(),
}));

jest.mock('@src/data/hooks', () => ({
  useInitializeSubsCourseDashboard: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useInitializeDashboard: jest.fn(),
  useDashboardMessages: jest.fn(),
}));

jest.mock('../../slots/DashboardModalSlot', () => jest.fn(() => <div>DashboardModalSlot</div>));
jest.mock('@src/containers/CoursesPanel', () => jest.fn(() => <div>CoursesPanel</div>));
jest.mock('../PopularCoursePanel', () => jest.fn(() => <div>PopularCoursePanel</div>));
jest.mock('@src/containers/SelectSessionModal', () => jest.fn(() => <div>SelectSessionModal</div>));
jest.mock('./DashboardLayout', () => jest.fn(({ children }) => <div>DashboardLayout{children}</div>));

const pageTitle = 'test-page-title';
const spinnerScreenReaderText = 'test-spinner-screen-reader-text';

describe('Dashboard', () => {
  const createWrapper = (props = {}) => {
    const {
      hasCourses = true,
      initIsPending = true,
      showSelectSessionModal = true,
    } = props;
    hooks.useDashboardMessages.mockReturnValue({
      pageTitle,
      spinnerScreenReaderText,
    });
    const dataMocked = { data: hasCourses ? { subscriptionCourses: [1, 2] } : { subscriptionCourses: [] }, isPending: initIsPending };
    useInitializeSubsCourseDashboard.mockReturnValue(dataMocked);
    useSelectSessionModal.mockReturnValue({ selectSessionModal: showSelectSessionModal ? { cardId: 1 } : null });
    return render(<IntlProvider locale="en"><Dashboard /></IntlProvider>);
  };

  describe('render', () => {
    it('page title is displayed in sr-only h1 tag', () => {
      createWrapper();
      const heading = screen.getByText(pageTitle);
      expect(heading).toHaveClass('sr-only');
    });
    describe('initIsPending false', () => {
      it('should render DashboardModalSlot', () => {
        createWrapper({ initIsPending: false });
        const dashboardModalSlot = screen.getByText('DashboardModalSlot');
        expect(dashboardModalSlot).toBeInTheDocument();
      });
      it('should render SelectSessionModal', () => {
        createWrapper({ initIsPending: false });
        const selectSessionModal = screen.getByText('SelectSessionModal');
        expect(selectSessionModal).toBeInTheDocument();
      });
    });
    describe('courses still loading', () => {
      it('should render LoadingView', () => {
        createWrapper({ initIsPending: true });
        const loadingView = screen.getByRole('status');
        expect(loadingView).toBeInTheDocument();
      });
    });
    describe('courses loaded', () => {
      it('should show dashboard layout', () => {
        createWrapper({ initIsPending: false });
        const dashboardLayout = screen.getByText('DashboardLayout');
        expect(dashboardLayout).toBeInTheDocument();
      });
      it('should render PopularCoursePanel', () => {
        createWrapper({ initIsPending: false });
        const popularCoursePanel = screen.getByText('PopularCoursePanel');
        expect(popularCoursePanel).toBeInTheDocument();
      });
    });
  });
});
