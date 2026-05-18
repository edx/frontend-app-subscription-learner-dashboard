import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router';

import { useCourseData } from '@src/hooks';

import CourseCardBanners from '.';

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
    isLimitedAccess: true
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
});
