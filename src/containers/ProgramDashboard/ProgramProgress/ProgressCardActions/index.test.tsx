import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router-dom';

import { ProgressCardActions } from './';
import { useProgressData } from '@src/hooks';

jest.mock('@src/hooks', () => ({
  useProgressData: jest.fn(),
}));

const renderComponent = (tabType: string, redirectUrl?: string) =>
  render(
    <MemoryRouter>
      <IntlProvider locale="en">
        <ProgressCardActions tabType={tabType} redirectUrl={redirectUrl} />
      </IntlProvider>
    </MemoryRouter>
  );

describe('ProgressCardActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "View course details" link when remaining courses exist', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [{ title: 'Course 1' }],
        },
      },
    });

    renderComponent('remaining', '/course');

    const link = screen.getByRole('link', {
      name: /view course details/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/course');
  });

  it('does NOT render button when remainingCourseCount is 0', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          notStarted: [],
        },
      },
    });

    renderComponent('remaining');

    expect(
      screen.queryByRole('link', { name: /view course details/i })
    ).not.toBeInTheDocument();
  });

  it('renders "Resume course" link when completed courses exist', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          completed: [{ title: 'Course 1' }],
        },
      },
    });

    renderComponent('completed', '/resume');

    const button = screen.getByRole('link', { name: /resume course/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/resume');
  });

  it('does NOT render resume button when count is 0', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        courseData: {
          completed: [],
        },
      },
    });

    renderComponent('completed');

    expect(
      screen.queryByRole('link', { name: /resume course/i })
    ).not.toBeInTheDocument();
  });
});
