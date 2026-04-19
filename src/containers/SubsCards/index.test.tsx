import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { when } from 'jest-when';

import { SubsCard } from './index';
import { useCards } from './hooks/useCards';

// Mock the hook
jest.mock('./hooks/useCards');

// Mock CardView component
jest.mock('./components/CardView', () => ({
  CardView: jest.fn(({ data, isLoading, isError }) => (
    <div data-testid="card-view">
      <span data-testid="data">{JSON.stringify(data)}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="error">{String(isError)}</span>
    </div>
  )),
}));

const mockedUseCards = useCards as jest.Mock;

describe('Card Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    when(mockedUseCards).calledWith().mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    render(<SubsCard />);

    expect(screen.getByTestId('card-view')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('error')).toHaveTextContent('false');
  });

  it('renders error state', () => {
    when(mockedUseCards).calledWith().mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<SubsCard />);

    expect(screen.getByTestId('error')).toHaveTextContent('true');
  });

  it('renders data correctly', () => {
    const mockData = [{ id: 1, title: 'Test Card' }];

    when(mockedUseCards).calledWith().mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<SubsCard />);

    expect(screen.getByTestId('data')).toHaveTextContent(
      JSON.stringify(mockData)
    );
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('false');
  });

  it('wraps content inside container div', () => {
    when(mockedUseCards).calledWith().mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    const { container } = render(<SubsCard />);

    expect(container.querySelector('.container')).toBeInTheDocument();
  });
});
