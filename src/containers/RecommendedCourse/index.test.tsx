import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { useRecommendedCourseData } from '@src/hooks/useRecommendedCourseData';
import { RecommendedCourse } from './index';

jest.mock('@src/hooks/useRecommendedCourseData', () => ({
  useRecommendedCourseData: jest.fn(),
}));

describe('RecommendedCourse', () => {
  const mockHook = useRecommendedCourseData as jest.Mock;

  const mockData = [
    {
      id: 1,
      title: 'Course 1',
    },
    {
      id: 2,
      title: 'Course 2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(<IntlProvider locale="en"><RecommendedCourse /></IntlProvider>);

  describe('Error state', () => {
    it('renders error alert when isError is true', () => {
      mockHook.mockReturnValue({
        data: [],
        isLoading: false,
        isError: true,
      });

      renderComponent();

      expect(
        screen.getByTestId('recommended-course-error')
      ).toBeInTheDocument();
    });

    it('does not render cards when error occurs', () => {
      mockHook.mockReturnValue({
        data: [],
        isLoading: false,
        isError: true,
      });

      renderComponent();

      expect(
        screen.queryByTestId('recommended-course-cards')
      ).not.toBeInTheDocument();
    });
  });

  describe('Success state', () => {
    it('renders container when data is available', () => {
      mockHook.mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: false,
      });

      renderComponent();

      expect(
        screen.getByTestId('recommended-course-cards')
      ).toBeInTheDocument();
    });

    it('renders correct number of ProductCards', () => {
      mockHook.mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: false,
      });

      renderComponent();

      const cards = screen.getAllByTestId('product-card');
      expect(cards).toHaveLength(2);
    });

    it('passes correct data to ProductCard', () => {
      mockHook.mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: false,
      });

      renderComponent();

      expect(screen.getByText('Course 1')).toBeInTheDocument();
      expect(screen.getByText('Course 2')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('renders cards even when loading is true', () => {
      mockHook.mockReturnValue({
        data: mockData,
        isLoading: true,
        isError: false,
      });

      renderComponent();

      expect(
        screen.getByTestId('recommended-course-cards')
      ).toBeInTheDocument();

      expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    });
  });

  describe('Empty state', () => {
    it('renders container but no cards when data is empty', () => {
      mockHook.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      });

      renderComponent();

      expect(
        screen.getByTestId('recommended-course-cards')
      ).toBeInTheDocument();

      expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
    });
  });
});
