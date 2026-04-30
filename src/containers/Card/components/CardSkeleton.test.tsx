import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardSkeleton } from './CardSkeleton';
import { useWindowSize } from '@openedx/paragon';

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
}));

const mockWidth = (width: number) => {
  (useWindowSize as jest.Mock).mockReturnValue({ width });
};

describe('CardSkeleton', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it.each([
    [500, 1],
    [1000, 2],
    [1400, 4],
  ])('renders %i cards for width %i', (width, expected) => {
    mockWidth(width);

    render(<CardSkeleton />);

    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(expected);
  });
});
