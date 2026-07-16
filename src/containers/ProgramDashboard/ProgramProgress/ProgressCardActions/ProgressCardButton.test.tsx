import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
});
