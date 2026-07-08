import React, { useMemo } from 'react';

import { useIntl } from '@openedx/frontend-base';
import { useInitializeSubsCourseDashboard } from '@src/data/hooks';

import CourseListSlot from '../../slots/CourseListSlot';
import { useFilters } from '@src/data/context';

import { getTransformedCourseDataObject, getVisibleList } from '@src/utils/dataTransformers';

import messages from './messages';

export const HistoryPanel = () => {
  const { formatMessage } = useIntl();
  const { data } = useInitializeSubsCourseDashboard();
  const targetAuditAccessExpired = true;

  const historyCourses = useMemo(() => {
    const combinedCourses = [
      ...(data?.subscriptionCourses || []).map(course => ({
        ...course,
        isFromNonUpgradeableCourses: false,
      })),
      ...(data?.nonUpgradeableCourses || []).map(course => ({
        ...course,
        isFromNonUpgradeableCourses: true,
      })),
    ];

    return combinedCourses.filter(
      course => course?.enrollment?.isAuditAccessExpired === targetAuditAccessExpired,
    );
  }, [data, targetAuditAccessExpired]);
  const hasCourses = useMemo(() => historyCourses.length > 0, [historyCourses]);

  const {
    filters, sortBy, pageNumber, setPageNumber,
  } = useFilters();
  const { visibleList, numPages } = useMemo(() => {
    const transformedCourses = Object.values(getTransformedCourseDataObject(historyCourses));
    return getVisibleList(
      transformedCourses,
      filters,
      sortBy,
      pageNumber,
    );
  }, [historyCourses, filters, sortBy, pageNumber]);

  React.useEffect(() => {
    if (numPages > 0 && pageNumber > numPages) {
      setPageNumber(1);
    }
  }, [numPages, pageNumber, setPageNumber]);

  const courseListData = {
    showFilters: true,
    setPageNumber,
    numPages,
    visibleList,
    verifiedCourse: true,
    isHistoryTab: true,
  };

  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourseHistory)}</h2>
      </div>
      {hasCourses && <CourseListSlot courseListData={courseListData} />}
    </div>
  );
};

HistoryPanel.propTypes = {};

export default HistoryPanel;
