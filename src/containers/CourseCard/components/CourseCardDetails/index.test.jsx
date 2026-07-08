import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import CourseCardDetails from '.';

import hooks from './hooks';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const cardId = 'test-card-id';

describe('CourseCard Details component', () => {
  const defaultHooks = {
    providerName: 'provider-name',
    accessMessage: 'access-message',
    openSessionModal: jest.fn().mockName('useSelectSession.openSessionModal'),
    isEntitlement: true,
    isFulfilled: true,
    canChange: true,
    isAuditAccessExpired: false,
    isFromNonUpgradeableCourses: false,
    courseNumber: 'test-course-number',
    changeOrLeaveSessionMessage: 'change-or-leave-session-message',
  };
  const createWrapper = (hookOverrides = {}, propsOverrides = {}) => {
    hooks.mockReturnValueOnce({
      ...defaultHooks,
      ...hookOverrides,
    });
    return render(
      <IntlProvider locale="en">
        <CourseCardDetails cardId={cardId} {...propsOverrides} />
      </IntlProvider>,
    );
  };

  it('has change session button on entitlement course', () => {
    const wrapper = createWrapper();
    const sessionButton = screen.getByRole('button', { name: defaultHooks.changeOrLeaveSessionMessage });
    expect(sessionButton).toBeInTheDocument();

    const accessMessage = screen.getByText((text) => text.includes(defaultHooks.accessMessage));
    expect(accessMessage).toBeInTheDocument();
    
  });

  it('has change session button on entitlement course but no access message', () => {
    const wrapper = createWrapper({ accessMessage: null });
    const sessionButton = screen.getByRole('button', { name: defaultHooks.changeOrLeaveSessionMessage });
    expect(sessionButton).toBeInTheDocument();

    const accessMessage = screen.queryByText((text) => text.includes(defaultHooks.accessMessage));
    expect(accessMessage).toBeNull();

  });

  it('does not have change session button on regular course', () => {
    const wrapper = createWrapper({ isEntitlement: false });
    const sessionButton = screen.queryByRole('button', { name: defaultHooks.changeOrLeaveSessionMessage });
    expect(sessionButton).toBeNull();

    const accessMessage = screen.getByText((text) => text.includes(defaultHooks.accessMessage));
    expect(accessMessage).toBeInTheDocument();
  });

  it('shows audit badge and non-upgradeable message for expired audit access on non-upgradeable course', () => {
    createWrapper(
      { isAuditAccessExpired: true, isFromNonUpgradeableCourses: true },
      { isHistoryTab: true },
    );

    expect(screen.getByText('Audit track')).toBeInTheDocument();
    expect(screen.getByText('Access expired. This course is not included in your subscription.')).toBeInTheDocument();
  });

  it('shows audit badge and short expired message for expired audit access on subscription course', () => {
    createWrapper(
      { isAuditAccessExpired: true, isFromNonUpgradeableCourses: false },
      { isHistoryTab: true },
    );

    expect(screen.getByText('Audit track')).toBeInTheDocument();
    expect(screen.getByText('Access expired.')).toBeInTheDocument();
  });
});
