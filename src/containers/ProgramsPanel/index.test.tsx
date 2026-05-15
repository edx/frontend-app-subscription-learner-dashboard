import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import ProgramsPanel from '.';
import messages from './messages';

const renderComponent = () => render(<IntlProvider locale="en"><ProgramsPanel /></IntlProvider>);

describe('ProgramsPanel', () => {
  it('renders the ProgramsPanel component', () => {
    renderComponent();

    expect(screen.getByText(messages.myPrograms.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.programsMessage.defaultMessage)).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    renderComponent();

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(messages.myPrograms.defaultMessage);
  });

  it('displays the correct message', () => {
    renderComponent();

    const message = screen.getByText(messages.programsMessage.defaultMessage);
    expect(message).toBeInTheDocument();
  });
});
