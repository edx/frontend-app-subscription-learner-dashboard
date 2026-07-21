import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { usePopularCoursesData } from '@src/hooks/usePopularCourses';
import { useAlgoliaSearch } from '@src/utils/algoliaUtils';
import { PopularCoursePanel } from './index';

jest.mock('@src/hooks/usePopularCourses', () => ({
  usePopularCoursesData: jest.fn(),
}));

jest.mock('@src/utils/algoliaUtils', () => ({
  useAlgoliaSearch: jest.fn(),
}));

describe('PopularCoursePanel', () => {
  const mockHook = usePopularCoursesData as jest.Mock;
  const mockUseAlgoliaSearch = useAlgoliaSearch as jest.Mock;

  const mockData = [
    {
      objectID: '1',
      title: 'Course 1',
      primary_description: 'Body 1',
      url: 'https://example.com/course-1.png',
      content_type: 'Course',
      product: 'Course',
      tagText: '',
      thumbnail: '',
    },
    {
      objectID: '2',
      title: 'Program 1',
      primary_description: 'Body 2',
      url: 'https://example.com/course-2.png',
      content_type: 'Program',
      product: 'Program',
      tagText: 'Professional Certificate',
      thumbnail: '',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAlgoliaSearch.mockReturnValue([null]);
  });

  const renderComponent = () => render(<IntlProvider locale="en"><PopularCoursePanel /></IntlProvider>);

  it('renders title and cards when data exists', () => {
    mockHook.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByTestId('popular-courses-panel')).toBeInTheDocument();
    expect(screen.getByText('Popular courses')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  it('renders error alert when data fetching fails', () => {
    mockHook.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    renderComponent();

    expect(screen.getByTestId('popular-courses-error')).toBeInTheDocument();
    expect(screen.queryByTestId('popular-courses-items')).not.toBeInTheDocument();
    expect(screen.queryByTestId('no-popular-course-items')).not.toBeInTheDocument();
  });

  it('renders empty state when no data exists', () => {
    mockHook.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    renderComponent();

    expect(screen.getByTestId('no-popular-course-items')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });
});
