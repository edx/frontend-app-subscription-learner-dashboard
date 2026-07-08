import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router';

import { useCourseData } from '@src/hooks';
import { formatMessage } from '@src/testUtils';

import CourseCardBanners from '.';
import messages from './messages';

jest.mock('./RedeemBanner', () => jest.fn(() => <div>RedeemBanner</div>));

const mockedComponents = [
  'RedeemBanner'
];

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(() => ({
    enrollment: {
      isEnrolled: true,
    },
  })),
}));

describe('CourseCardBanners', () => {
  const props = {
    cardId: 'test-card-id',
    verifiedCourse: false,
  };
  it('renders default CourseCardBanners', () => {
    render(<MemoryRouter><IntlProvider locale="en"><CourseCardBanners {...props} /></IntlProvider></MemoryRouter>);
    mockedComponents.map((componentName) => {
      const mockedComponent = screen.getByText(componentName);
      return expect(mockedComponent).toBeInTheDocument();
    });
  });
  it('render null with no courseData', () => {
    useCourseData.mockReturnValue(null);
    const { container } = render(<MemoryRouter><IntlProvider locale="en"><CourseCardBanners {...props} /></IntlProvider></MemoryRouter>);
    expect(container.firstChild).toBeNull();
  });

  it('renders subscription upgrade banner for audit-expired subscription course', () => {
    useCourseData.mockReturnValue({
      enrollment: { isAuditAccessExpired: true },
      courseRun: { marketingUrl: 'https://example.com/upgrade' },
    });
    render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <CourseCardBanners cardId="test-card-id" verifiedCourse isHistoryTab />
        </IntlProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(formatMessage(messages.subscriptionUpgradeBannerText))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: formatMessage(messages.upgradeAction) })).toBeInTheDocument();
    expect(screen.queryByText('RedeemBanner')).toBeNull();
  });
});
