import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { Title } from './Title';
import messages from './messages';

const renderComponent = (intlMessages: Record<string, string> = {}) =>
  render(
    <IntlProvider locale="en" messages={intlMessages}>
      <Title />
    </IntlProvider>
  );

describe('Title', () => {
  it('renders title and subtitle correctly', () => {
    renderComponent({
      [messages.dashboardTitle.id]: 'Dashboard Title',
      [messages.dashboardSubtitle.id]: 'Dashboard Subtitle',
    });

    expect(screen.getByTestId('dashboard-title'))
      .toHaveTextContent('Dashboard Title');

    expect(screen.getByTestId('dashboard-subtitle'))
      .toHaveTextContent('Dashboard Subtitle');
  });

  it('renders fallback message when no title message is provided', () => {
    renderComponent({
      [messages.dashboardSubtitle.id]: 'Dashboard Subtitle',
    });

    expect(screen.getByTestId('dashboard-title'))
      .toBeInTheDocument();

    expect(screen.getByTestId('dashboard-subtitle'))
      .toHaveTextContent('Dashboard Subtitle');
  });
});
