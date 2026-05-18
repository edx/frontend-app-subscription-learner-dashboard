import MicroMastersProgramDetailsSvgIcon from '../assets/micromasters-icon.svg';
import ProfCertProgramDetailsSvgIcon from '../assets/professional-certificate-program-details.svg';
import XSeriesProgramDetailsSvgIcon from '../assets/xseries-program-details.svg';
import { PROGRAM_TYPE_MAP } from './constants';

export function getProgramIcon(type: string) {
  switch (type) {
    case PROGRAM_TYPE_MAP.XSERIES:
      return XSeriesProgramDetailsSvgIcon;
    case PROGRAM_TYPE_MAP.PROFESSIONAL_CERTIFICATE:
      return ProfCertProgramDetailsSvgIcon;
    case PROGRAM_TYPE_MAP.MICROMASTERS:
      return MicroMastersProgramDetailsSvgIcon;
    default:
      return '';
  }
}
