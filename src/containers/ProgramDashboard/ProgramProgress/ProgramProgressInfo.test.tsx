import { render, RenderResult, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import ProgramProgressInfo from './ProgramProgressInfo';
import messages from './messages';

jest.mock('./UpgradeButton', () => ({
  UpgradeAllButton: () => <div data-testid="upgrade-all-button" />,
}));

const defaultProps = {
  allCoursesCompleted: true,
  totalCoursesInProgram: 3,
  programTitle: 'Test Professional Certificate',
  discountData: {
    totalInclTaxExclDiscounts: 756.0,
    totalInclTax: 680.4,
    currency: 'USD',
    isDiscounted: true,
    discountValue: 75.60000000000002
  },
};

const renderComponent = (props = {}): RenderResult => render(
  <IntlProvider locale="en">
    <ProgramProgressInfo {...defaultProps} {...props} />
  </IntlProvider>,
);

describe('ProramProgressInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct text when all courses have been completed for a program', () => {
    renderComponent();

    expect(screen.getByText(messages.programProgressCompleteHeader.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(`You have successfully completed all the requirements for ${defaultProps.programTitle}.`)).toBeInTheDocument();
  });

  it('renders the correct text when the user has NOT completed all of the courses in a program', () => {
    renderComponent({
      ...defaultProps,
      allCoursesCompleted: false,
    });

    expect(screen.getByText(messages.programProgressIncompleteHeader.defaultMessage)).toBeInTheDocument();
    expect(screen.getByTestId('program-incomplete-info-text')).toBeInTheDocument();
  });

  it('renders UpgradeAllButton when discount data includes required pricing fields', () => {
    renderComponent({
      ...defaultProps,
      allCoursesCompleted: false,
      discountData: {
        currency: 'USD',
        totalInclTaxExclDiscounts: 756.0,
        totalInclTax: 680.4,
      },
    });

    expect(screen.getByTestId('upgrade-all-button')).toBeInTheDocument();
  });

  it('does not render UpgradeAllButton when discount data is an empty object', () => {
    renderComponent({
      ...defaultProps,
      allCoursesCompleted: false,
      discountData: {},
    });

    expect(screen.queryByTestId('upgrade-all-button')).not.toBeInTheDocument();
  });
});
