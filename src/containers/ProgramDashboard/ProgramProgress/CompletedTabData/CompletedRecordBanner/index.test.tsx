import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { CompletedRecordBanner } from './';

describe('CompletedRecordBanner Component', () => {
  const renderWithIntl = () => render(<IntlProvider locale="en"><CompletedRecordBanner /></IntlProvider>);

  test('renders content', () => {
    renderWithIntl();

    expect(screen.getByText('Earning a program record')).toBeInTheDocument();
    expect(screen.getByTestId('completed-banner-card')).toBeInTheDocument();
  });

  test('renders buttons', () => {
    renderWithIntl();

    expect(screen.getByRole('button', { name: /help center/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my program records/i })).toBeInTheDocument();
  });
});
