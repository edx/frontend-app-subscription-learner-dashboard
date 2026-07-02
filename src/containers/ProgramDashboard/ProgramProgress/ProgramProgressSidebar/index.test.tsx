import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '@src/testUtils';

import { ProgramProgressSidebar } from './index';
import messages from '../messages';

jest.mock('./ProgramProgressCircle', () => jest.fn((props) => (
  <div data-testid="program-progress-circle">{JSON.stringify(props)}</div>
)));

describe('ProgramProgressSidebar', () => {
  const props = {
    inProgress: 2,
    remaining: 1,
    completed: 3,
  };

  const renderComponent = (overrideProps = {}) => render(
    <IntlProvider locale="en">
      <ProgramProgressSidebar {...props} {...overrideProps} />
    </IntlProvider>,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders sidebar container and progress circle', () => {
    renderComponent();

    expect(screen.getByTestId('program-certificate-progress')).toBeInTheDocument();
    expect(screen.getByTestId('program-progress-circle')).toBeInTheDocument();
  });

  it('passes progress values to ProgramProgressCircle', () => {
    renderComponent();

    expect(screen.getByTestId('program-progress-circle')).toHaveTextContent(
      JSON.stringify(props),
    );
  });

  it('renders localized heading and supporting copy', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      formatMessage(messages.programProgressCertificateLabel),
    );
    expect(screen.getByText(formatMessage(messages.programProgressCertificateContentOne))).toBeInTheDocument();
    expect(screen.getByText(/This program is valued at\s*\(\$896\.10\)\s*for non-subscribers/i)).toBeInTheDocument();
  });
});
