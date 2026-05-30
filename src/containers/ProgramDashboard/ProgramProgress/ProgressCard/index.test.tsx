import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProgressCard } from './index';

jest.mock('../ProgressCardActions', () => ({
  ProgressCardActions: () => <button>View course details</button>,
}));

const mockData = {
  id: 'course-v1:edX+DemoX+Demo_Course',
  title: 'Customer-Centric Innovation',
  certificateStatus: 'Needs verified certificate',
  courseRuns: [
    {
      pacingType: 'self_paced',
      start: '2025-02-03',
    },
  ],
};

const renderComponent = (props = {}) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <ProgressCard progressCardData={mockData} isLoading={false} {...props} />
      </IntlProvider>
    </QueryClientProvider>
  );
};

describe('ProgressCard', () => {
  test('renders title', () => {
    renderComponent();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
  });

  test('renders enrollment info with label', () => {
    renderComponent();

    expect(
      screen.getByText(/Enrolled : \(Self Paced\) Started Feb 3, 2025/i)
    ).toBeInTheDocument();
  });

  test('renders certificate status', () => {
    renderComponent();
    expect(screen.getByText(/Certificate Status:/i)).toBeInTheDocument();

    expect(screen.getByText(mockData.certificateStatus)).toBeInTheDocument();
  });

  test('renders View course details button', () => {
    renderComponent();
    expect(screen.getByText('View course details')).toBeInTheDocument();
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
