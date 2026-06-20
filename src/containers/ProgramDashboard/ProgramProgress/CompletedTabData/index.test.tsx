import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { CompletedTabData } from './index';
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

// Mock Banner
jest.mock('./Banner', () => ({
  Banner: () => <div data-testid="banner" />,
}));

const renderComponent = () => render(<IntlProvider locale="en"><CompletedTabData /></IntlProvider>);

describe('CompletedTabData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and banner', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText('Completed courses')).toBeInTheDocument();
    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });

  it('renders no courses message when no data', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          completed: [],
        },
      },
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText('As you complete courses, you will see them listed here.')).toBeInTheDocument();
  });

  it('renders progress cards when data exists', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          completed: [
            {
              id: '1',
              title: 'Course 1',
              courseRuns: [
                {
                  pacingType: 'self',
                  start: '2024-01-01',
                  end: '2024-02-01',
                  certificateUrl: 'cert-url',
                  courseUrl: 'course-url',
                },
              ],
            },
            {
              id: '2',
              title: 'Course 2',
              courseRuns: [],
            },
          ],
        },
      },
      isLoading: false,
    });

    renderComponent();

    const cards = screen.getAllByTestId('progress-card');
    expect(cards).toHaveLength(2);

    expect(screen.getByText('Course 1')).toBeInTheDocument();
    expect(screen.getByText('Course 2')).toBeInTheDocument();
  });
});
