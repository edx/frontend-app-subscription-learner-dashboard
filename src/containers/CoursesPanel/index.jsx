import React, { useMemo } from 'react';

import { useIntl } from '@openedx/frontend-base';
import { useInitializeLearnerHome } from '@src/data/hooks';
import {
  CourseFilterControls,
} from '../../containers/CourseFilterControls';
import CourseListSlot from '../../slots/CourseListSlot';
import NoCoursesViewSlot from '../../slots/NoCoursesViewSlot';
import { useFilters } from '@src/data/context';

import { getVisibleList } from '@src/utils/dataTransformers';

import messages from './messages';

import './index.scss';

/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/
export const CoursesPanel = () => {
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();
  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);

  const {
    filters, sortBy, pageNumber, setPageNumber,
  } = useFilters();
  const { visibleList, numPages } = useMemo(() => {
    const transformedCourses = data?.coursesByCardId
      ? Object.values(data.coursesByCardId)
      : [];
    return getVisibleList(
      transformedCourses,
      filters,
      sortBy,
      pageNumber,
    );
  }, [data, filters, sortBy, pageNumber]);

  // Clamp page number when filtered/mutated list shrinks
  React.useEffect(() => {
    if (numPages > 0 && pageNumber > numPages) {
      setPageNumber(1);
    }
  }, [numPages, pageNumber, setPageNumber]);

  // TODO [TEMP]: Passing data twice and displaying the list twice, also fixed the corresponding test cases to reflect this.
  // Reason: Requirements not finalized
  // Action: Revisit after UX and data confirmation
  const courseListData = {
    setPageNumber,
    numPages,
    visibleList,
    verifiedCourse: true,
  };

  const limitedCourseListData = {
    ...courseListData,
    verifiedCourse: false,
  };

  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
      </div>
      {hasCourses ? <CourseListSlot courseListData={courseListData} /> : <NoCoursesViewSlot />}

      <div className="course-list-heading-container">
        <h2 className="course-list-title text-gray-700">{formatMessage(messages.limitedCourse)}</h2>
      </div>
      {hasCourses ? <CourseListSlot courseListData={limitedCourseListData} /> : <NoCoursesViewSlot />}
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;
