import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProgramProgressTabs } from './';

jest.mock('../RemainingTabData', () => ({
  RemainingTabData: () => <div data-testid="remaining-tab-data" />,
}));

const defaultProps = {
  type: 'default',
  counts: {
    inProgress: 3,
    remaining: 5,
    completed: 2,
  },
};

const renderComponent = (props = {}) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <ProgramProgressTabs {...defaultProps} {...props} />
      </IntlProvider>
    </QueryClientProvider>
  );
};

describe('ProgramProgressTabs', () => {
  test('renders all default tabs with counts', () => {
    renderComponent();

    expect(screen.getByText('In progress (3)')).toBeInTheDocument();
    expect(screen.getByText('Remaining (5)')).toBeInTheDocument();
    expect(screen.getByText('Completed (2)')).toBeInTheDocument();
  });

  test('does NOT render pathway tab when type is not MicroMasters', () => {
    renderComponent();

    expect(screen.queryByText(/Pathway/)).not.toBeInTheDocument();
  });

  test('renders pathway tab when type is MicroMasters', async () => {
    renderComponent({ type: 'MicroMasters' });

    const user = userEvent.setup();
    const pathwaysTab = screen.getByRole('tab', { name: /Pathways/i });
    expect(pathwaysTab).toBeInTheDocument();
    await user.click(pathwaysTab);
    expect(screen.getByText('Pathways tab data will be available soon.')).toBeInTheDocument();
  });

  test('defaults to first tab being active', () => {
    renderComponent();

    const inProgressTab = screen.getByRole('tab', { name: /In progress/i });
    expect(inProgressTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByText('Courses in progress')
    ).toBeInTheDocument();
  });

  test('switches tabs on click', async () => {
    const user = userEvent.setup();
    renderComponent();

    const inProgressTab = screen.getByRole('tab', { name: /In progress/i });
    const remainingTab = screen.getByRole('tab', { name: /Remaining/i });

    // Default active
    expect(inProgressTab).toHaveAttribute('aria-selected', 'true');

    await user.click(remainingTab);

    expect(remainingTab).toHaveAttribute('aria-selected', 'true');
    expect(inProgressTab).toHaveAttribute('aria-selected', 'false');
  });

  test('switches to pathway tab when present', async () => {
    const user = userEvent.setup();

    renderComponent({ type: 'MicroMasters' });

    const pathwayTab = screen.getByRole('tab', { name: /Pathways/i });
    await user.click(pathwayTab);

    expect(
      screen.getByText('Pathways tab data will be available soon.')
    ).toBeInTheDocument();
  });
});
