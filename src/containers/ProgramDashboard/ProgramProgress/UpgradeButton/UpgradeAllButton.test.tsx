import { IntlProvider } from '@openedx/frontend-base';
import { render, RenderResult, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UpgradeAllButton from './UpgradeAllButton';
import messages from './messages';

const mockBuyButtonUrl = 'http://test-buy-url.com';
const mockCurrency = 'USD';
const mockDiscountedPrice = 500.00;
const mockListPrice = 800.00;

jest.mock('@src/data/hooks/queryHooks', () => ({
  useProgramProgressData: () => ({
    data: {
      urls: {
        buyButtonUrl: mockBuyButtonUrl,
      },
      programData: {
        discountData: {
          currency: mockCurrency,
          isDiscounted: true,
          totalInclTaxExclDiscounts: mockListPrice,
          totalInclTax: mockDiscountedPrice,
        },
      },
    },
  }),
}));

const renderComponent = (): RenderResult => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <UpgradeAllButton />
      </IntlProvider>
    </QueryClientProvider>
  );
};

describe('UpgradeAllButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the button with the correct text and link in the NOT discounted state', () => {
    renderComponent();

    const button = screen.getByTestId('upgrade-all-button');

    expect(button).toHaveTextContent(messages.upgradeAllRemainingCoursesButtonText.defaultMessage);

    expect(button).toHaveAttribute('href', mockBuyButtonUrl);

    expect(screen.getByText(`$${mockListPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it('renders the button with the correct text and link in the discounted state', () => {
    renderComponent();

    const button = screen.getByTestId('upgrade-all-button');

    expect(button).toHaveTextContent(messages.upgradeAllRemainingCoursesButtonText.defaultMessage);

    expect(button).toHaveAttribute('href', mockBuyButtonUrl);

    expect(screen.getByText(`$${mockListPrice.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockDiscountedPrice.toFixed(2)}`)).toBeInTheDocument();
  });
});
