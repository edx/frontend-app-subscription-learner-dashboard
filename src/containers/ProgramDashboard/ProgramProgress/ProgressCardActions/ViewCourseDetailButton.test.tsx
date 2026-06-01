import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { ViewCourseDetailButton } from './ViewCourseDetailButton';

describe('ViewCourseDetailButton', () => {
  it('renders button with default message using IntlProvider', () => {
    render(
      <IntlProvider locale="en">
        <ViewCourseDetailButton />
      </IntlProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('View course details')).toBeInTheDocument();
  });
});
