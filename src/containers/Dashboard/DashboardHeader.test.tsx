import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { DashboardHeader } from './DashboardHeader';
import messages from './messages';

const defaultStartDate = 'January 1, 2024';

const renderComponent = (
  startDate = defaultStartDate,
  intlMessages: Record<string, string> = {},
) =>
  render(
    <IntlProvider locale="en" messages={intlMessages}>
      <DashboardHeader startDate={startDate} />
    </IntlProvider>,
  );

describe('DashboardHeader', () => {
  it('renders header title and subtitle correctly', () => {
    renderComponent(defaultStartDate, {
      [messages.dashboardHeaderWelcomeTitle.id]: 'Welcome to your learning home.',
      [messages.dashboardHeaderWelcomeMessage.id]:
        'Subscriber since {startDate}',
    });

    expect(screen.getByTestId('dashboard-header-title'))
      .toHaveTextContent('Welcome to your learning home.');

    expect(screen.getByTestId('dashboard-header-subtitle'))
      .toHaveTextContent(
        `Subscriber since ${defaultStartDate}`,
      );
  });

  it('renders fallback title message when title translation is not provided', () => {
    renderComponent(defaultStartDate, {
      [messages.dashboardHeaderWelcomeMessage.id]:
        'Subscriber since {startDate}',
    });

    expect(screen.getByTestId('dashboard-header-title'))
      .toHaveTextContent(messages.dashboardHeaderWelcomeTitle.defaultMessage);

    expect(screen.getByTestId('dashboard-header-subtitle'))
      .toHaveTextContent(`Subscriber since ${defaultStartDate}`);
  });

  it('renders interpolated startDate in subtitle', () => {
    const startDate = 'March 15, 2025';

    renderComponent(startDate, {
      [messages.dashboardHeaderWelcomeTitle.id]: 'Welcome to your learning home.',
      [messages.dashboardHeaderWelcomeMessage.id]:
        'Subscriber since {startDate}',
    });

    expect(screen.getByTestId('dashboard-header-subtitle'))
      .toHaveTextContent(`Subscriber since ${startDate}`);
  });
});
