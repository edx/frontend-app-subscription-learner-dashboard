import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
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
    content_type: 'Test Category',
    partner: '',
    weeks_to_complete: 4,
    level: 'Beginner',
  };

  const renderComponent = (overrideProps = {}) => {
    const props = {
      item: { ...baseMockData, ...overrideProps },
      isLoading: false,
    };

    return render(
      <IntlProvider locale="en">
        <ProductCard {...props} />
      </IntlProvider>,
    );
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });

    it('renders title, body, and footer', () => {
      renderComponent();

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    it('renders all structural sections', () => {
      renderComponent();

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    it('renders content_type in header', () => {
      renderComponent({ content_type: 'Custom Type' });

      expect(screen.getByText('Custom Type')).toBeInTheDocument();
    });
  });

  describe('Badge Rendering', () => {
    it('renders partner when provided', () => {
      renderComponent({ partner: 'Acme Corp' });

      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    it('renders empty partner when not provided', () => {
      renderComponent({ partner: undefined });

      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });

    it('does not render partner when empty string', () => {
      renderComponent({ partner: '' });

      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });

    it('renders partner with product Course', () => {
      renderComponent({ product: 'Course', partner: 'Test Partner' });

      expect(screen.getByText('Test Partner')).toBeInTheDocument();
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
      render(
        <IntlProvider locale="en">
          <ProductCard item={baseMockData} isLoading />
        </IntlProvider>,
      );

      expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });
  });
});
