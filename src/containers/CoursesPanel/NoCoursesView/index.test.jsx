import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '@src/testUtils';
import { baseAppUrl } from '@src/data/services/lms/urls';

import EmptyCourse from '.';
import messages from './messages';

const courseSearchUrl = '/course-search-url';

jest.mock('@src/data/hooks', () => ({
  useInitializeSubsDashboard: jest.fn(() => ({
    data: {
      platformSettings: {
        courseSearchUrl,
      },
    },
  })),
}));

describe('NoCoursesView', () => {
  it('renders the empty courses placeholder', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const prompt = screen.getByText(formatMessage(messages.inProgressCoursesPrompt));
    expect(prompt).toBeInTheDocument();
  });
  it('should display button', () => {
    render(<IntlProvider locale="en"><EmptyCourse /></IntlProvider>);
    const button = screen.getByRole('link', { name: formatMessage(messages.findCoursesButton) });
    expect(button).toBeInTheDocument();
    expect(button.href).toBe(baseAppUrl(courseSearchUrl));
  });
});
