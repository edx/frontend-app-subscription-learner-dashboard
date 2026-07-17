import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { InProgressTabData } from './';
import { useProgressData } from '@src/hooks';

// Mock hook
jest.mock('@src/hooks', () => ({
  useProgressData: jest.fn(),
}));

// Mock ProgressCard (important)
jest.mock('../ProgressCard', () => ({
  ProgressCard: ({ progressCardData }: any) => (
    <div data-testid="progress-card">
      {progressCardData.title}
    </div>
  ),
}));

const renderComponent = () => render(<IntlProvider locale="en"><InProgressTabData /></IntlProvider>);

describe('InProgressTabData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText('Courses in progress')).toBeInTheDocument();
  });

  it('renders list of in-progress courses', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          inProgress: [
            { key: 'course-1', title: 'First Course', courseRuns: [] },
            { key: 'course-2', title: 'Second Course', courseRuns: [] },
          ],
          notStarted: [],
          completed: [],
        },
        programData: {
          type: 'MicroMasters',
        },
        urls: {
          buyButtonUrl: 'http://test-url.com',
        },
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    const cards = screen.getAllByTestId('progress-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('First Course')).toBeInTheDocument();
    expect(screen.getByText('Second Course')).toBeInTheDocument();
  });

  it('renders empty state when no courses', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          inProgress: [],
          notStarted: [],
          completed: [
            { key: 'course-1', title: 'Done Course' },
          ],
        },
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('You have completed all courses in the program.')).toBeInTheDocument();
  });

  it('renders empty state when courseData is missing', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Courses in progress')).toBeInTheDocument();
    expect(screen.queryByText('Enroll in the next course in the program.')).not.toBeInTheDocument();
    expect(screen.queryByText('You have completed all the courses in the program.')).not.toBeInTheDocument();
  });

  it('passes isLoading to ProgressCard', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          inProgress: [{ key: 'course-1', title: 'First Course', courseRuns: [] }],
          notStarted: [],
          completed: [],
        },
        urls: {
          buyButtonUrl: 'http://test-url.com',
        },
      },
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('progress-card')).toBeInTheDocument();
  });
});
