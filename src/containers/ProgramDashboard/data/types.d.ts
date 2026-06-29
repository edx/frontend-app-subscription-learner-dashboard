// Program List types
export interface ProgramListData {
  programs: ProgramData[],
  isMasquerading: boolean,
}

export interface ProgramList {
  programsData: ProgramData[],
  isLoading: boolean,
  errorState: boolean,
}

export interface ProgramData {
  uuid: string,
  title: string,
  type: string,
  bannerImage: {
    small: ImageData,
    medium: ImageData,
    large: ImageData,
    xSmall: ImageData,
  },
  authoringOrganizations?: AuthoringOrganization[],
  progress: Progress,
  discountData: any,
}

export interface ImageData {
  height: number,
  width: number,
  url: string,
}

export interface AuthoringOrganization {
  uuid: string,
  key: string,
  name: string,
  logoImageUrl: string,
  certificateLogoImageUrl: string | null,
}

export interface Progress {
  inProgress: number,
  notStarted: number,
  completed: number,
  uuid?: string,
  allUnenrolled?: boolean,
}

export interface ProgramCardProps {
  program: ProgramData,
}

// Program Progress types
export interface ProgramProgressData {
  urls: {
    programListingUrl: string | undefined,
    trackSelectionUrl: string | undefined,
    commerceApiUrl: string | undefined,
    buyButtonUrl: string | undefined,
    programRecordUrl: string | undefined,
  },
  courseData: any | null,
  programData: ProgramData | null,
}

export interface ProgramProgressHeaderProps {
  programTitle: string,
  programType: string,
  authoringOrganizations?: AuthoringOrganization[],
}

export interface ProgramProgressInfoProps {
  allCoursesCompleted: boolean,
  totalCoursesInProgram: number,
  programTitle: string,
  discountData: any,
}

export interface ProgramProgressTabsProps {
  type: string,
  counts: {
    inProgress: number,
    remaining: number,
    completed: number,
    pathway?: number,
  },
};

export interface ProgramProgressTabItems {
  key: string,
  title: string,
  count?: number,
  panel: React.ReactNode,
}

export interface ProgressCardProps {
  progressCardData: ProgressCardData,
  isLoading?: boolean,
  tabType?: string,
}

export interface ProgressCardData {
  id: string,
  title: string,
  certificateStatus: string,
  courseRuns?: CourseRunData[],
}

export interface CourseRunData {
  pacingType: string,
  start: string,
}
