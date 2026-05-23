import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { ProgressCard } from './index';

const mockData = {
  id: 'course-v1:edX+DemoX+Demo_Course',
  title: 'Customer-Centric Innovation',
  enrollmentInfo: 'Self-paced Started Feb 3, 2025',
  certificateStatus: 'Needs verified certificate',
};

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <ProgressCard
        progressCardData={mockData}
        isLoading={false}
        {...props}
      />
    </IntlProvider>
  );

describe('ProgressCard', () => {
  test('renders title', () => {
    renderComponent();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
  });

  test('renders enrollment info with label', () => {
    renderComponent();

    expect(screen.getByText(new RegExp(`Enrolled:\\s*${mockData.enrollmentInfo}`, 'i'))).toBeInTheDocument();
  });

  test('renders certificate status', () => {
    renderComponent();
    expect(screen.getByText(/Certificate Status:/i)).toBeInTheDocument();

    expect(screen.getByText(mockData.certificateStatus)).toBeInTheDocument();
  });

  test('renders Resume button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /Resume course/i })).toBeInTheDocument();
  });

  test('renders Upgrade button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /Upgrade with your subscription/i, })).toBeInTheDocument();
  });

  test('applies loading state to card', () => {
    const { container } = renderComponent({ isLoading: true });

    const card = container.querySelector('[data-testid="progress-card"]');
    expect(card).toBeInTheDocument();
  });
});
