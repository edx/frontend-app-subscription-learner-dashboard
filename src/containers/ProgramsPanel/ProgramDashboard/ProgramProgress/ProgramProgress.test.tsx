import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from '@openedx/frontend-base';

import ProgramProgress from './ProgramProgress';
import { useProgramProgressData } from '@src/data/hooks/queryHooks';

jest.mock('@src/data/hooks/queryHooks', () => ({
  useProgramProgressData: jest.fn(),
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
    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: null,
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

    expect(screen.getByText('Invalid URL')).toBeInTheDocument();
  });

  it('renders program data correctly', () => {
    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: {
        program_data: {
          title: 'Test Program',
          type: 'MicroMasters',
          authoring_organizations: ['Org1'],
        },
        course_data: {
          not_started: [{ id: 1 }],
          in_progress: [{ id: 2 }],
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
    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: {
        program_data: {
          title: 'Completed Program',
          type: 'XSeries',
          authoring_organizations: [],
        },
        course_data: {
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
