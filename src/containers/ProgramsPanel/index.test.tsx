import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import ProgramsPanel from '.';
import { formatMessage } from '@src/testUtils';
import messages from './messages';

const renderComponent = (hasProgramsEnrollment = false) => {
  jest.spyOn(React, 'useState').mockImplementation(() => [hasProgramsEnrollment, jest.fn()]);
  return render(<IntlProvider locale="en"><ProgramsPanel /></IntlProvider>);
};

describe('ProgramsPanel', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('renders the ProgramsPanel component', () => {
    renderComponent();
    expect(screen.getByTestId('programs-list')).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    renderComponent();
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent(formatMessage(messages.myPrograms));
  });

  it('renders NoProgramsView when hasProgramsEnrollment is false', () => {
    renderComponent(false);
    expect(screen.getByText('Find a program')).toBeInTheDocument();
  });

  it('does not render NoProgramsView when hasProgramsEnrollment is true', () => {
    renderComponent(true);
    expect(screen.queryByText('Find a program')).not.toBeInTheDocument();
  });
});
