import MicroMastersProgramDetailsSvgIcon from '../assets/micromasters-icon.svg';
import ProfCertProgramDetailsSvgIcon from '../assets/professional-certificate-program-details.svg';
import XSeriesProgramDetailsSvgIcon from '../assets/xseries-program-details.svg';
import { PROGRAM_TYPE_MAP } from './constants';
import { Seat } from './types';

export const UPGRADEABLE_SEAT_TYPES = ['verified', 'professional', 'no-id-professional', 'credit'];

/**
 * Returns a formatted price string for the first upgradeable seat in a course run.
 * Mirrors the logic in edx-platform:
 *   lms/static/js/learner_dashboard/models/course_card_model.js -> getCertificatePriceString()
 *
 * Upgradeable seat types: 'verified', 'professional', 'no-id-professional', 'credit'
 * Format: '$300.00' for USD, '300.00 EUR' for other currencies.
 */
export function getCertificatePriceString(seats?: Seat[]): string {
  if (!seats || seats.length === 0) {
    return '';
  }
  const upgradeableSeats = seats.filter((seat) => UPGRADEABLE_SEAT_TYPES.includes(seat.type));
  if (upgradeableSeats.length === 0) {
    return '';
  }
  const seat = upgradeableSeats[0];
  const priceWithCurrency = `${seat.price} ${seat.currency}`;
  if (seat.currency === 'USD') {
    return `$${priceWithCurrency}`;
  }
  return priceWithCurrency; // For non-USD currencies, return in the format "300.00 EUR"
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
