import { render, screen, waitFor } from '@testing-library/react';
import { logError } from '@openedx/frontend-base';
import ProgramsList from '.';
import { useProgramsListData } from '@src/data/hooks';
import ProgramListCard from './ProgramListCard';
import messages from './messages';

jest.mock('@src/data/hooks', () => ({
  useProgramsListData: jest.fn(),
}));

jest.mock('@openedx/frontend-base', () => ({
  defineMessages: (msgs: Record<string, unknown>) => msgs,
  useIntl: () => ({
    formatMessage: (
      messageDescriptor: { defaultMessage?: string, id?: string },
      values?: Record<string, unknown>,
    ) => {
      const msg = messageDescriptor.defaultMessage || messageDescriptor.id || '';
      if (!values) return msg;
      // Spread any React-element values so the rendered output includes them
      return [msg, ...Object.values(values)] as any;
    },
  }),
  camelCaseObject: (value: unknown) => value,
  getSiteConfig: () => ({
    lmsBaseUrl: 'http://test-lms',
  }),
  logError: jest.fn(),
}));

jest.mock('./ProgramListCard', () => jest.fn(({ program }) => (
  <div data-testid="program-list-card">{program.title}</div>
)));

const mockApiData = [
  { uuid: '111-aaa', title: 'Data Science Program' },
  { uuid: '222-bbb', title: 'UX Design Program' },
];

describe('ProgramsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // useProgramsListData is a synchronous hook — use mockReturnValue, NOT mockResolvedValue
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: mockApiData,
      isLoading: false,
      isError: false,
    });
  });

  const renderComponent = () => render(<ProgramsList />);

  it('renders header text', () => {
    renderComponent();
    expect(screen.getByText(messages.programsListHeaderText.defaultMessage)).toBeInTheDocument();
  });

  it('fetches program data on mount', () => {
    renderComponent();
    expect(useProgramsListData).toHaveBeenCalledTimes(1);
  });

  it('renders a loading spinner while data is being fetched', () => {
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
  });

  it('renders ProgramListCard for each program when enrollments exist', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryAllByTestId('program-list-card').length).toBeGreaterThan(0);
    });

    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({ program: mockApiData[0] }),
      {},
    );
    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({ program: mockApiData[1] }),
      {},
    );
  });

  it('logs an error and renders the failure alert (with contact link) when the API request fails', async () => {
    const testError = new Error('Failed to fetch program enrollments');
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: testError,
    });
    renderComponent();

    await waitFor(() => {
      expect(logError).toHaveBeenCalledWith(testError);
    });

    // Alert text content renders
    expect(screen.getByText(messages.errorLoadingProgramEnrollments.defaultMessage)).toBeInTheDocument();

    // Alert.Link renders with the correct contact-support href
    const contactLink = screen.getByRole('link', { name: 'http://test-lms/contact' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', 'http://test-lms/contact');

    // No program cards should be present
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
  });
});
