import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { RemainingTabData } from './';
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

const renderComponent = () => render(<IntlProvider locale="en"><RemainingTabData /></IntlProvider>);

describe('RemainingTabData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText('Remaining Courses')).toBeInTheDocument();
  });

  it('renders list of remaining courses', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [
            { title: 'First Course' },
            { title: 'Second Course' },
          ],
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
          notStarted: [],
        },
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText("You have enrolled in all of this program's courses.")).toBeInTheDocument();
  });

  it('renders empty state when courseData is missing', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText("You have enrolled in all of this program's courses.")).toBeInTheDocument();
  });

  it('passes isLoading to ProgressCard', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [{ title: 'First Course' }],
        },
      },
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('progress-card')).toBeInTheDocument();
  });
});
