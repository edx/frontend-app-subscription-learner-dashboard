import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router';

import hooks from './hooks';
import DashboardLayout from './DashboardLayout';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({
    data: {
      platformSettings: {
        courseSearchUrl: '/courses',
      },
    },
  }),
}));

jest.mock('./hooks', () => ({
  useDashboardLayoutData: jest.fn(),
}));


const hookProps = {
  isCollapsed: true,
  sidebarShowing: false,
  setSidebarShowing: jest.fn().mockName('hooks.setSidebarShowing'),
};
hooks.useDashboardLayoutData.mockReturnValue(hookProps);

const children = <div>test children</div>;

describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<MemoryRouter><IntlProvider locale="en"><DashboardLayout>{children}</DashboardLayout></IntlProvider></MemoryRouter>);
  });

  const testColumns = () => {
    it('displays children in first column', () => {
      const courseChildren = screen.getByText('test children');
      const courseListCol = courseChildren.parentElement;
      expect(courseChildren).toBeInTheDocument();
      expect(courseListCol).toHaveClass('course-list-column');
    });
  };
  const testSidebarLayout = () => {
    it('displays withSidebar width for course list column', () => {
      const courseListCol = screen.getByText('test children').parentElement;
      expect(courseListCol).toHaveClass('course-list-column col');
    });
  };
  describe('collapsed', () => {
    describe('sidebar showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({ ...hookProps, sidebarShowing: true });
      });
      testColumns();
      testSidebarLayout();
    });
  });

  describe('not collapsed', () => {
    describe('sidebar showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({
          ...hookProps,
          isCollapsed: false,
          sidebarShowing: true,
        });
      });
      testColumns();
      testSidebarLayout();
    });
  });
});
