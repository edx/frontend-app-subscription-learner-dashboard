import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from '@openedx/frontend-base';

import ProgramProgress from './ProgramProgress';
import { useProgressData } from '@src/hooks';

jest.mock('@src/hooks', () => ({
  useProgressData: jest.fn(),
}));

jest.mock('./ProgramProgressHeader', () => {
  const MockProgramProgressHeader = () => (
    <div data-testid="header">Header</div>
  );

  return MockProgramProgressHeader;
});

jest.mock('./ProgramProgressInfo', () => {
  const MockProgramProgressInfo = (props: any) => (
    <div data-testid="info">
      Info - {props.totalCoursesInProgram}
    </div>
  );

  return MockProgramProgressInfo;
});

const renderComponent = (route = '/program/test-uuid') => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/program/:uuid" element={<IntlProvider locale="en"><ProgramProgress /></IntlProvider>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ProgramProgress', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: true,
      error: false,
    });

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {},
      isLoading: false,
      error: true,
    });

    renderComponent();

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('renders invalid URL when uuid is missing', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/program/']}>
          <Routes>
            <Route path="/program/" element={<ProgramProgress />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('renders program data correctly', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        programData: {
          title: 'Test Program',
          type: 'MicroMasters',
          authoringOrganizations: ['Org1'],
        },
        courseData: {
          notStarted: [{ id: 1 }],
          inProgress: [{ id: 2 }],
          completed: [{ id: 3 }],
        },
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('header')).toBeInTheDocument();

    // total courses = 3
    expect(screen.getByTestId('info')).toHaveTextContent('Info - 3');
  });

  it('detects all courses completed correctly', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        programData: {
          title: 'Completed Program',
          type: 'XSeries',
          authoring_organizations: [],
        },
        courseData: {
          not_started: [],
          in_progress: [],
          completed: [{ id: 1 }, { id: 2 }],
        },
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('info')).toHaveTextContent('Info - 2');
  });
});
