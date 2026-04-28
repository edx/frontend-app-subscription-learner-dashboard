import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CardSkeleton } from './CardSkeleton';

const createMatchMedia = (matches: boolean) =>
  jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

describe('CardSkeleton', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders 1 skeleton card on mobile', () => {
    window.matchMedia = createMatchMedia(true);

    render(<CardSkeleton />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(1);
  });

  it('renders 2 skeleton cards on tablet', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      return {
        matches: query === '(max-width: 1199px)',
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    render(<CardSkeleton />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(2);
  });

  it('renders 4 skeleton cards on desktop', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    render(<CardSkeleton />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(4);
  });
});
