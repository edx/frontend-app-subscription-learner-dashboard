import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import ProgramsPanel from '.';
import { formatMessage } from '@src/testUtils';
import messages from './messages';
import { useProgramsListData } from '@src/data/hooks/queryHooks';

jest.mock('@src/data/hooks/queryHooks', () => ({
  useProgramsListData: jest.fn(),
}));

jest.mock('../ProgramDashboard', () => ({
  ProgramsList: () => <div data-testid="programs-dashboard-list" />,
}));

const renderComponent = (hasProgramsEnrollment = false) => {
  (useProgramsListData as jest.Mock).mockReturnValue({
    data: hasProgramsEnrollment ? [{ uuid: 'program-1' }] : [],
  });
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
    expect(screen.getByText(formatMessage(messages.emptyProgramsMessage))).toBeInTheDocument();
  });

  it('does not render NoProgramsView when hasProgramsEnrollment is true', () => {
    renderComponent(true);
    expect(screen.queryByText(formatMessage(messages.emptyProgramsMessage))).not.toBeInTheDocument();
  });
});
