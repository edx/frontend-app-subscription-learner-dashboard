import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { RemainingTabData } from './';
import messages from '../messages';

jest.mock('@src/hooks', () => ({
  useProgressData: jest.fn(),
}));

import { useProgressData } from '@src/hooks';

const renderComponent = () =>
  render(
    <IntlProvider
      locale="en"
      messages={{
        [messages.programProgressRemainingTabNoCourse.id]:
          messages.programProgressRemainingTabNoCourse.defaultMessage,
      }}
    >
      <RemainingTabData />
    </IntlProvider>
  );

describe('RemainingTabData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of remaining courses', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [
            { id: 'course-1', title: 'First Course', certificateStatus: '' },
            { id: 'course-2', title: 'Second Course', certificateStatus: '' },
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

    expect(screen.getByText("You have enrolled in all this program's courses.")).toBeInTheDocument();
  });

  it('renders empty state when courseData is missing', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByText("You have enrolled in all this program's courses.")).toBeInTheDocument();
  });

  it('passes isLoading to ProgressCard', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [{ id: 'course-1', title: 'First Course', certificateStatus: '' }],
        },
      },
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('progress-card')).toBeInTheDocument();
  });
});
