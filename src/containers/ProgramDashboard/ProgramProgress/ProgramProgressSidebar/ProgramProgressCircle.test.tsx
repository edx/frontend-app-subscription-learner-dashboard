import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '@src/testUtils';
import ProgramProgressCircle from './ProgramProgressCircle';
import messages from '../messages';

describe('ProgramProgressCircle', () => {
  const renderComponent = (props = { inProgress: 2, remaining: 1, completed: 3 }) => render(
    <IntlProvider locale="en">
      <ProgramProgressCircle {...props} />
    </IntlProvider>,
  );

  it('renders svg and the expected number of segments', () => {
    renderComponent({ inProgress: 2, remaining: 1, completed: 3 });

    expect(screen.getByTestId('svg-circle')).toBeInTheDocument();
    expect(screen.getAllByTestId('circle-segment')).toHaveLength(6);
  });

  it('marks completed and incomplete segments correctly', () => {
    renderComponent({ inProgress: 2, remaining: 1, completed: 3 });

    const segments = screen.getAllByTestId('circle-segment');
    const completedSegments = segments.filter(segment => segment.classList.contains('complete'));
    const incompleteSegments = segments.filter(segment => segment.classList.contains('incomplete'));

    expect(completedSegments).toHaveLength(3);
    expect(incompleteSegments).toHaveLength(3);
  });

  it('renders progress numbers and earned certificates label', () => {
    renderComponent({ inProgress: 4, remaining: 1, completed: 2 });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText(formatMessage(messages.programProgressEarnedCertificates))).toBeInTheDocument();
  });

  it('renders no segments when total courses is zero', () => {
    renderComponent({ inProgress: 0, remaining: 0, completed: 0 });

    expect(screen.getByTestId('svg-circle')).toBeInTheDocument();
    expect(screen.queryAllByTestId('circle-segment')).toHaveLength(0);
    expect(screen.getAllByText('0')).toHaveLength(2);
  });
});
