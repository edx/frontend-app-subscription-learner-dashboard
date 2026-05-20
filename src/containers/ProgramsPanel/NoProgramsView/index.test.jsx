import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '@src/testUtils';
import { baseAppUrl } from '@src/data/services/lms/urls';

import NoProgramsView from '.';
import messages from './messages';

const programSearchUrl = '/explore-programs';

const renderComponent = () => { return render(<IntlProvider locale="en"><NoProgramsView /></IntlProvider>) };

describe('NoProgramsView', () => {
  it('renders the empty programs placeholder', () => {
    renderComponent();
    const prompt = screen.getByText(formatMessage(messages.inProgressProgramsPrompt));
    expect(prompt).toBeInTheDocument();
  });
  it('should display button', () => {
    renderComponent();
    const button = screen.getByRole('link', { name: formatMessage(messages.findProgramsButton) });
    expect(button).toBeInTheDocument();
    expect(button.href).toBe(baseAppUrl(programSearchUrl));
  });
});
