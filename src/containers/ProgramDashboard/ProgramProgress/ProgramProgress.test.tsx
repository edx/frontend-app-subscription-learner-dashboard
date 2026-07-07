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

jest.mock('./ProgramProgressSidebar', () => {
  const MockProgramProgressSidebar = (props: any) => (
    <div data-testid="sidebar">
      Sidebar - inProgress: {props.inProgress}, remaining: {props.remaining}, completed: {props.completed}
    </div>
  );

  return { ProgramProgressSidebar: MockProgramProgressSidebar };
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

    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: null,
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/program/']}>
          <Routes>
            <Route path="/program/" element={<ProgramProgress />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Invalid URL')).toBeInTheDocument();
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
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar - inProgress: 1, remaining: 1, completed: 1');
  });

  it('detects all courses completed correctly', () => {
    (useProgressData as jest.Mock).mockReturnValue({
      programProgressData: {
        programData: {
          title: 'Completed Program',
          type: 'XSeries',
          authoringOrganizations: [],
        },
        courseData: {
          notStarted: [],
          inProgress: [],
          completed: [{ id: 1 }, { id: 2 }],
        },
      },
      isLoading: false,
      error: null,
    });

    renderComponent();

    expect(screen.getByTestId('info')).toHaveTextContent('Info - 2');
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar - inProgress: 0, remaining: 0, completed: 2');
  });
});
