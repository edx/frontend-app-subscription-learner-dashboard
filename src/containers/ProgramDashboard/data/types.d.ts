// Program List types
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
}

export interface ProgramProgressProviderProps {
  children: import('react').ReactNode,
}

export interface ProgramProgressContextValueType {
  programProgressData: ProgramProgressData,
  setProgramProgressData: (data: ProgramProgressData) => void,
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
}

export interface ProgressCardData {
  id: string,
  title: string,
  enrollmentInfo: string,
  certificateStatus: string,
}
