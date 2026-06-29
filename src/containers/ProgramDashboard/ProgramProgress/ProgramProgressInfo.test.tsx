import { render, RenderResult, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import ProgramProgressInfo from './ProgramProgressInfo';
import messages from './messages';

jest.mock('./UpgradeButton', () => ({
  UpgradeAllButton: 'UpgradeAllButton',
}));

const defaultProps = {
  allCoursesCompleted: true,
  totalCoursesInProgram: 3,
  programTitle: 'Test Professional Certificate',
  discountData: {
    total_incl_tax_excl_discounts: 756.0,
    total_incl_tax: 680.4,
    currency: 'USD',
    is_discounted: true,
    discount_value: 75.60000000000002
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
});
