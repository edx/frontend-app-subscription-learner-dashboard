import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from '@openedx/frontend-base';
import { ProgressCardButton } from './ProgressCardButton';

const renderComponent = (props = {}) => render(
  <MemoryRouter>
    <IntlProvider locale="en">
      <ProgressCardButton variant="primary" redirectUrl="/course" buttonText="View Course" {...props} />
    </IntlProvider>
  </MemoryRouter>
);

describe('ProgressCardButton', () => {
  test('renders button with text', () => {
    renderComponent();

    expect(screen.getByText('View Course')).toBeInTheDocument();
  });

  test('renders as a link with correct href', () => {
    renderComponent();

    const button = screen.getByRole('link', { name: /view course/i });

    expect(button).toHaveAttribute('href', '/course');
  });

  test('applies correct variant class', () => {
    renderComponent({ variant: 'outline-primary', redirectUrl: '/test', buttonText: 'Test Button' });

    const button = screen.getByRole('link', { name: /test button/i });

    expect(button).toHaveClass('btn-outline-primary');
  });

  test('opens upgrade modal with expected title and content', async () => {
    const user = userEvent.setup();

    renderComponent({
      redirectUrl: '',
      buttonText: 'Upgrade with your subscription',
      type: 'upgrade',
      title: 'Business Writing',
      price: '$100.00',
      courseUrl: '/course/resume',
    });

    await user.click(screen.getByRole('button', { name: /upgrade with your subscription/i }));

    expect(screen.getByText('You now have full access to the Business Writing')).toBeInTheDocument();
    expect(screen.getByText("You're saving as a subscriber. This course is valued at $100.00.")).toBeInTheDocument();
  });
});
