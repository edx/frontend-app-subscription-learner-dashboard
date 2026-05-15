import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import ProgramsPanel from '.';
import messages from './messages';

describe('ProgramsPanel', () => {
  it('renders the ProgramsPanel component', () => {
    render(
      <IntlProvider locale="en">
        <ProgramsPanel />
      </IntlProvider>
    );

    expect(screen.getByText(messages.myPrograms.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.programsMessage.defaultMessage)).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    render(
      <IntlProvider locale="en">
        <ProgramsPanel />
      </IntlProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(messages.myPrograms.defaultMessage);
  });

  it('displays the correct message', () => {
    render(
      <IntlProvider locale="en">
        <ProgramsPanel />
      </IntlProvider>
    );

    const message = screen.getByText(messages.programsMessage.defaultMessage);
    expect(message).toBeInTheDocument();
  });
});
