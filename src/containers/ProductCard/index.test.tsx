import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ProductCard } from './index';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

describe('ProductCard', () => {
  const baseMockData = {
    objectID: '1',
    title: 'Test Card',
    primary_description: 'Test Body Content',
    url: 'https://via.placeholder.com/150',
    thumbnail: 'https://via.placeholder.com/50',
    product: 'Program',
    tagText: 'New',
    footerLabel: 'Test Category',
  };

  const renderComponent = (overrideProps = {}) => {
    const props = {
      item: { ...baseMockData, ...overrideProps },
      isLoading: false,
    };

    return render(<ProductCard {...props} />);
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });

    it('renders title, body, and footer', () => {
      renderComponent();

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test Body Content')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    it('renders all structural sections', () => {
      renderComponent();

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test Body Content')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    it('strips html tags from description text', () => {
      renderComponent({ primary_description: '<p>This is <strong>plain</strong> text</p>' });

      expect(screen.getByText('This is plain text')).toBeInTheDocument();
      expect(screen.queryByText('<p>This is <strong>plain</strong> text</p>')).not.toBeInTheDocument();
    });
  });

  describe('Badge Rendering', () => {
    it('renders badge when product is Program and tagText exists', () => {
      renderComponent();

      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('does not render badge when product is Course', () => {
      renderComponent({ product: 'Course' });

      expect(screen.queryByText('New')).not.toBeInTheDocument();
    });

    it('does not render badge when tagText is empty', () => {
      renderComponent({ tagText: '' });

      expect(screen.queryByText('New')).not.toBeInTheDocument();
    });

    it('does not render badge when tagText is undefined', () => {
      renderComponent({ tagText: undefined });

      expect(screen.queryByText('New')).not.toBeInTheDocument();
    });
  });

  describe('Images', () => {
    it('renders main image with correct alt text', () => {
      renderComponent();

      expect(screen.getByAltText('Test Card main-image')).toBeInTheDocument();
    });

    it('renders thumbnail image when provided', () => {
      renderComponent();

      expect(screen.getByAltText('Test Card thumbnail-image')).toBeInTheDocument();
    });

    it('does not break if thumbnail is missing', () => {
      renderComponent({ thumbnail: '' });

      expect(screen.getByAltText('Test Card main-image')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('renders without crashing when loading', () => {
      render(<ProductCard item={baseMockData} isLoading />);

      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });
  });
});
