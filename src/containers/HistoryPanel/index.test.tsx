import React from 'react';
import { render, screen } from '@testing-library/react';
import { useInitializeSubsCourseDashboard } from '@src/data/hooks';
import { useFilters } from '@src/data/context';
import { HistoryPanel } from './index';

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  useIntl: () => ({
    formatMessage: ({ defaultMessage }) => defaultMessage,
  }),
  defineMessages: (messages) => messages,
}));

jest.mock('@src/data/hooks');
jest.mock('@src/data/context');

jest.mock('../../slots/CourseListSlot', () => {
  const PropTypes = jest.requireActual('prop-types') as typeof import('prop-types');

  const MockCourseListSlot = ({ courseListData }) => (
    <div data-testid="course-list-slot">
      {JSON.stringify(courseListData.visibleList.map(course => course.cardId))}
    </div>
  );

  MockCourseListSlot.propTypes = {
    courseListData: PropTypes.shape({
      visibleList: PropTypes.arrayOf(PropTypes.shape({
        cardId: PropTypes.string,
      })).isRequired,
    }).isRequired,
  };

  MockCourseListSlot.displayName = 'MockCourseListSlot';
  return MockCourseListSlot;
});

const mockUseInitializeSubsCourseDashboard = useInitializeSubsCourseDashboard as jest.MockedFunction<typeof useInitializeSubsCourseDashboard>;
const mockUseFilters = useFilters as jest.MockedFunction<typeof useFilters>;

describe('HistoryPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFilters.mockReturnValue({
      filters: [],
      sortBy: 'enrolled',
      pageNumber: 1,
      setPageNumber: jest.fn(),
      setFilters: jest.fn(),
      addFilter: jest.fn(),
      removeFilter: jest.fn(),
      clearFilters: jest.fn(),
      setSortBy: jest.fn(),
    } as any);
  });

  it('uses the shared coursesByCardId entries for history cards', () => {
    mockUseInitializeSubsCourseDashboard.mockReturnValue({
      data: {
        coursesByCardId: {
          'card-0': {
            cardId: 'card-0',
            enrollment: { isAuditAccessExpired: false, lastEnrolled: '2024-01-01T00:00:00Z' },
            course: { courseName: 'Active course' },
          },
          'card-1': {
            cardId: 'card-1',
            isFromNonUpgradeableCourses: false,
            enrollment: { isAuditAccessExpired: true, lastEnrolled: '2024-01-02T00:00:00Z' },
            course: { courseName: 'Expired subscription course' },
          },
          'card-2': {
            cardId: 'card-2',
            isFromNonUpgradeableCourses: true,
            enrollment: { isAuditAccessExpired: true, lastEnrolled: '2024-01-03T00:00:00Z' },
            course: { courseName: 'Expired limited course' },
          },
        },
      },
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<HistoryPanel />);

    expect(screen.getByTestId('course-list-slot')).toHaveTextContent('["card-2","card-1"]');
  });
});
