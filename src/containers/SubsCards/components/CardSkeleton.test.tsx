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
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
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
    expect(screen.getAllByText('', { selector: '.skeleton' }).length).toBe(1);
  });

  it('renders 2 skeleton cards on tablet', () => {
    let callCount = 0;

    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      callCount++;

      return {
        matches:
                    query === '(max-width: 1199px)'
                    && callCount === 1,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    render(<CardSkeleton />);

    const container = screen.getByTestId('skeleton');
    expect(container).toBeInTheDocument();
  });

  it('renders 4 skeleton cards on desktop', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false, // neither mobile nor tablet
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    render(<CardSkeleton />);

    const container = screen.getByTestId('skeleton');
    expect(container).toBeInTheDocument();
  });
});
