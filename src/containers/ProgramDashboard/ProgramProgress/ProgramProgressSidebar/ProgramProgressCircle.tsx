import { ProgramProgressCircleProps, CircleSegmentProps } from '../../data/types';
import { FC } from 'react';
import { PROGRAM_PROGRESS_CIRCLE_MAP } from '../../data/constants';
import { useIntl } from '@openedx/frontend-base';
import messages from '../../../ProgramDashboard/ProgramProgress/messages';

const {
  X_AXIS, Y_AXIS, CIRCLE_RADIUS, CIRCLE_DEGREES, STROKE_WIDTH,
} = PROGRAM_PROGRESS_CIRCLE_MAP;

const CircleSegment = ({
  total, index, classList,
}: CircleSegmentProps) => {
  const segmentDash = 2 * Math.PI * CIRCLE_RADIUS;
  const degreeInc = 360 / total;
  // Remove strokeWidth to show a gap between the segments
  let dashArray = segmentDash - STROKE_WIDTH;
  const segmentDegrees = CIRCLE_DEGREES + (index * degreeInc);
  const offset = 100 - ((1 / total) * 100);
  // Want the incomplete segments to have no gaps
  if (classList === 'incomplete' && (index + 1) < total) {
    dashArray = segmentDash;
  }

  return (
    <circle
      data-testid="circle-segment"
      className={classList}
      r={CIRCLE_RADIUS}
      cx={X_AXIS}
      cy={Y_AXIS}
      transform={`rotate(${segmentDegrees} ${X_AXIS} ${Y_AXIS})`}
      strokeWidth={STROKE_WIDTH}
      fill="none"
      strokeDasharray={dashArray}
      strokeDashoffset={offset}
    />
  );
};

const ProgramProgressCircle: FC<ProgramProgressCircleProps> = ({ inProgress, remaining, completed }) => {
  const totalCourses = inProgress + remaining + completed;
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="progress-circle-wrapper">
        <svg data-testid="svg-circle" className="progress-circle w-100 h-100" viewBox="5.4 5.4 33.2 33.2" aria-hidden="true">
          <circle className="bg" r={CIRCLE_RADIUS} cx={X_AXIS} cy={Y_AXIS} strokeWidth={STROKE_WIDTH} fill="none" />
          {Array.from({ length: totalCourses }).map((_, index) => {
            const segmentType = index >= completed ? 'incomplete' : 'complete';
            const typeIndex = index >= completed ? index - completed : index;
            return (
              <CircleSegment
                key={`${segmentType}-${typeIndex}`}
                total={totalCourses}
                index={index}
                classList={segmentType}
              />
            );
          })}
        </svg>
        <div className="progress-label">
          <div className="numbers">
            <span className="complete">{completed}</span>/<span className="total">{totalCourses}</span>
          </div>
          <div className="label">
            {formatMessage(messages.programProgressEarnedCertificates)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramProgressCircle;
