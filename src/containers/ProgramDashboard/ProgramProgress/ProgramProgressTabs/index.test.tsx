import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { ProgramProgressTabs } from './';

const defaultProps = {
  type: 'default',
  counts: {
    inProgress: 3,
    remaining: 5,
    completed: 2,
    pathway: 7,
  },
};

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <ProgramProgressTabs {...defaultProps} {...props} />
    </IntlProvider>
  );

describe('ProgramProgressTabs', () => {
  test('renders all default tabs with counts', () => {
    renderComponent();

    expect(screen.getByText('In Progress (3)')).toBeInTheDocument();
    expect(screen.getByText('Remaining (5)')).toBeInTheDocument();
    expect(screen.getByText('Completed (2)')).toBeInTheDocument();
  });

  test('does NOT render pathway tab when type is not MicroMasters', () => {
    renderComponent();

    expect(screen.queryByText(/Pathway/)).not.toBeInTheDocument();
  });

  test('renders pathway tab when type is MicroMasters', () => {
    renderComponent({ type: 'MicroMasters' });

    expect(screen.getByText('Pathway (7)')).toBeInTheDocument();
  });

  test('renders pathway tab with 0 when value is undefined', () => {
    renderComponent({
      type: 'MicroMasters',
      counts: {
        inProgress: 1,
        remaining: 2,
        completed: 3,
        pathway: undefined,
      },
    });

    expect(screen.getByText('Pathway (0)')).toBeInTheDocument();
  });

  test('defaults to first tab being active', () => {
    renderComponent();

    expect(
      screen.getByText('In Progress tab data will be available soon.')
    ).toBeInTheDocument();
  });

  test('switches tabs on click', async () => {
    const user = userEvent.setup();
    renderComponent();

    const remainingTab = screen.getByText('Remaining (5)');
    await user.click(remainingTab);

    expect(
      screen.getByText('Remaining tab data will be available soon.')
    ).toBeInTheDocument();
  });

  test('switches to pathway tab when present', async () => {
    const user = userEvent.setup();

    renderComponent({ type: 'MicroMasters' });

    const pathwayTab = screen.getByText('Pathway (7)');
    await user.click(pathwayTab);

    expect(
      screen.getByText('Pathway tab data will be available soon.')
    ).toBeInTheDocument();
  });
});
