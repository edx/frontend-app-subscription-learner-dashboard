import MicroMastersProgramDetailsSvgIcon from '../assets/micromasters-icon.svg';
import ProfCertProgramDetailsSvgIcon from '../assets/professional-certificate-program-details.svg';
import XSeriesProgramDetailsSvgIcon from '../assets/xseries-program-details.svg';
import { PROGRAM_TYPE_MAP } from './constants';
import type { Seat } from './types';

export const UPGRADEABLE_SEAT_TYPES = ['verified', 'professional', 'no-id-professional', 'credit'];

/**
 * Returns a formatted price string for the first upgradeable seat in a course run.
 * Mirrors the logic in edx-platform:
 *   lms/static/js/learner_dashboard/models/course_card_model.js -> getCertificatePriceString()
 *
 * Upgradeable seat types: 'verified', 'professional', 'no-id-professional', 'credit'
 * Format:
 *   - USD (default):           '$300.00'
 *   - USD (includeUSDCode):    '$300.00 USD'
 *   - Other currencies:        '300.00 EUR'
 */
export function getCertificatePriceString(seats?: Seat[], includeUSDCode = false): string {
  if (!seats || seats.length === 0) {
    return '';
  }
  const upgradeableSeats = seats.filter((seat) => UPGRADEABLE_SEAT_TYPES.includes(seat.type));
  if (upgradeableSeats.length === 0) {
    return '';
  }
  const seat = upgradeableSeats[0];
  if (seat.currency === 'USD') {
    return includeUSDCode ? `$${seat.price} USD` : `$${seat.price}`;
  }
  return `${seat.price} ${seat.currency}`;
}

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
