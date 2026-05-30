import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { ProgressCardActions } from './';
import { useProgressData } from '@src/hooks';

jest.mock('@src/hooks', () => ({
  useProgressData: jest.fn(),
}));

const renderComponent = () =>
  render(
    <IntlProvider locale="en">
      <ProgressCardActions />
    </IntlProvider>
  );

describe('ProgressCardActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ViewCourseDetailButton when remainingCourseCount > 0', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [1, 2, 3],
        },
      },
    });

    renderComponent();

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('View course details')).toBeInTheDocument();
  });

  it('does NOT render button when remainingCourseCount is 0', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [],
        },
      },
    });

    renderComponent();

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
