import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { useRecentlyViewedCoursesAndProgramsData } from '@src/hooks/useRecentlyViewedCoursesAndProgramsData';
import { useAlgoliaSearch } from '@src/utils/algoliaUtils';
import { RecentlyViewedPanel } from './index';

jest.mock('@src/hooks/useRecentlyViewedCoursesAndProgramsData', () => ({
  useRecentlyViewedCoursesAndProgramsData: jest.fn(),
}));

jest.mock('@src/utils/algoliaUtils', () => ({
  useAlgoliaSearch: jest.fn(),
}));

describe('RecentlyViewedPanel', () => {
  const mockHook = useRecentlyViewedCoursesAndProgramsData as jest.Mock;
  const mockUseAlgoliaSearch = useAlgoliaSearch as jest.Mock;

  const mockData = [
    {
      objectID: '1',
      title: 'Course 1',
      primary_description: 'Body 1',
      url: 'https://example.com/course-1.png',
      footerLabel: 'Course',
      product: 'Course',
      tagText: '',
      thumbnail: '',
    },
    {
      objectID: '2',
      title: 'Program 1',
      primary_description: 'Body 2',
      url: 'https://example.com/course-2.png',
      footerLabel: 'Program',
      product: 'Program',
      tagText: 'Professional Certificate',
      thumbnail: '',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAlgoliaSearch.mockReturnValue([null]);
  });

  const renderComponent = () => render(<IntlProvider locale="en"><RecentlyViewedPanel /></IntlProvider>);

  it('renders title and cards when data exists', () => {
    mockHook.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByTestId('recently-viewed-panel')).toBeInTheDocument();
    expect(screen.getByText('Recently viewed courses and programs')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  it('renders error alert when data fetching fails', () => {
    mockHook.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    renderComponent();

    expect(screen.getByTestId('recently-viewed-error')).toBeInTheDocument();
    expect(screen.queryByTestId('recently-viewed-items')).not.toBeInTheDocument();
    expect(screen.queryByTestId('no-recently-viewed-items')).not.toBeInTheDocument();
  });

  it('renders empty state when no data exists', () => {
    mockHook.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    renderComponent();

    expect(screen.getByTestId('no-recently-viewed-items')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });
});
