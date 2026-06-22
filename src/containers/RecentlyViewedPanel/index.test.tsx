import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';

import { useRecentlyViewedCoursesAndProgramsData } from '@src/hooks/useRecentlyViewedCoursesAndProgramsData';
import { RecentlyViewedPanel } from './index';

jest.mock('@src/hooks/useRecentlyViewedCoursesAndProgramsData', () => ({
  useRecentlyViewedCoursesAndProgramsData: jest.fn(),
}));

describe('RecentlyViewedPanel', () => {
  const mockHook = useRecentlyViewedCoursesAndProgramsData as jest.Mock;

  const mockData = [
    {
      id: 1,
      title: 'Course 1',
      body: 'Body 1',
      url: 'https://example.com/course-1.png',
      footerLabel: 'Course',
      isProgram: false,
      tagText: '',
      thumbnail: '',
    },
    {
      id: 2,
      title: 'Program 1',
      body: 'Body 2',
      url: 'https://example.com/course-2.png',
      footerLabel: 'Program',
      isProgram: true,
      tagText: 'Professional Certificate',
      thumbnail: '',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('renders empty state when no data exists', () => {
    mockHook.mockReturnValue({
      data: [],
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByTestId('no-recently-viewed-course')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });
});
