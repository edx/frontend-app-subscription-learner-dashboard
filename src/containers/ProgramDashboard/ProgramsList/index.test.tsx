import { render, screen, waitFor } from '@testing-library/react';
import ProgramsList from '.';
import ProgramListCard from './ProgramListCard';

jest.mock('@openedx/frontend-base', () => ({
  defineMessages: (msgs: Record<string, unknown>) => msgs,
  useIntl: () => ({
    formatMessage: (
      messageDescriptor: { defaultMessage?: string, id?: string },
      values?: Record<string, unknown>,
    ) => {
      const msg = messageDescriptor.defaultMessage || messageDescriptor.id || '';
      if (!values) return msg;
      // Spread any React-element values so the rendered output includes them
      return [msg, ...Object.values(values)] as any;
    },
  }),
  camelCaseObject: (value: unknown) => value,
  getSiteConfig: () => ({
    lmsBaseUrl: 'http://test-lms',
  }),
  logError: jest.fn(),
}));

jest.mock('./ProgramListCard', () => jest.fn(({ program }) => (
  <div data-testid="program-list-card">{program.title}</div>
)));

const mockApiData = {
  isMasquerading: false,
  programs: [
    {
      uuid: '111-aaa',
      title: 'API Testing Program',
      type: 'Professional Certificate',
      bannerImage: {
        large: {
          url: 'http://localhost:18381/media/media/programs/banner_images/4d3d9489-25b8-4f91-9cbd-8a1369ae2efd-cb0f532f85c8.large.jpg',
          width: 1440,
          height: 480
        },
        medium: {
          url: 'http://localhost:18381/media/media/programs/banner_images/4d3d9489-25b8-4f91-9cbd-8a1369ae2efd-cb0f532f85c8.medium.jpg',
          width: 726,
          height: 242
        },
        small: {
          url: 'http://localhost:18381/media/media/programs/banner_images/4d3d9489-25b8-4f91-9cbd-8a1369ae2efd-cb0f532f85c8.small.jpg',
          width: 435,
          height: 145
        },
        xSmall: {
          url: 'http://localhost:18381/media/media/programs/banner_images/4d3d9489-25b8-4f91-9cbd-8a1369ae2efd-cb0f532f85c8.x-small.jpg',
          width: 348,
          height: 116
        }
      },
      authoringOrganizations: [],
      progress: {
        uuid: '111-aaa',
        completed: 0,
        inProgress: 2,
        notStarted: 1,
        allUnenrolled: false
      },
      discountData: {}
    },
    {
      uuid: '222-bbb',
      title: 'Test Program',
      type: 'Professional Certificate',
      bannerImage: {
        large: {
          url: 'http://localhost:18381/media/media/programs/banner_images/dd0ce43f-5f73-48e8-830a-3a2fe288d9a7-dfbb7213b5db.large.jpg',
          width: 1440,
          height: 480
        },
        medium: {
          url: 'http://localhost:18381/media/media/programs/banner_images/dd0ce43f-5f73-48e8-830a-3a2fe288d9a7-dfbb7213b5db.medium.jpg',
          width: 726,
          height: 242
        },
        small: {
          url: 'http://localhost:18381/media/media/programs/banner_images/dd0ce43f-5f73-48e8-830a-3a2fe288d9a7-dfbb7213b5db.small.jpg',
          width: 435,
          height: 145
        },
        xSmall: {
          url: 'http://localhost:18381/media/media/programs/banner_images/dd0ce43f-5f73-48e8-830a-3a2fe288d9a7-dfbb7213b5db.x-small.jpg',
          width: 348,
          height: 116
        }
      },
      authoringOrganizations: [],
      progress: {
        uuid: '222-bbb',
        completed: 0,
        inProgress: 2,
        notStarted: 0,
        allUnenrolled: false
      },
      discountData: {}
    }
  ]
};

describe('ProgramsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(
    <ProgramsList
      programsData={mockApiData.programs}
      isLoading={false}
      errorState={false}
    />
  );

  it('renders a loading spinner while data is being fetched', () => {
    const renderComponent = () => render(
      <ProgramsList
        programsData={[]}
        isLoading={true}
        errorState={false}
      />
    );
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
  });

  it('renders ProgramListCard for each program when enrollments exist', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryAllByTestId('program-list-card').length).toBeGreaterThan(0);
    });

    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({ program: mockApiData.programs[0] }),
      {},
    );
    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({ program: mockApiData.programs[1] }),
      {},
    );
  });

  it('renders the error alert when errorState is true', () => {
    render(
      <ProgramsList
        programsData={[]}
        isLoading={false}
        errorState={true}
      />,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
  });

  it('renders nothing if loading is finished and no data found', () => {
    const renderComponent = () => render(
      <ProgramsList
        programsData={[]}
        isLoading={false}
        errorState={false}
      />
    );
    renderComponent();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
  });
});
