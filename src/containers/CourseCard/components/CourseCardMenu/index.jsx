import PropTypes from 'prop-types';

import { useIntl } from '@openedx/frontend-base';
import { Dropdown, Icon, IconButton } from '@openedx/paragon';
import { MoreVert, Share } from '@openedx/paragon/icons';

import EmailSettingsModal from '@src/containers/EmailSettingsModal';
import UnenrollConfirmModal from '@src/containers/UnenrollConfirmModal';
import { useCourseData, useIsMasquerading } from '@src/hooks';
import SocialShareMenu from './SocialShareMenu';
import {
  useEmailSettings,
  useUnenrollData,
  useHandleToggleDropdown,
  useOptionVisibility,
} from './hooks';

import messages from './messages';

export const testIds = {
  unenrollModalToggle: 'unenrollModalToggle',
};

export const CourseCardMenu = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);

  const isEmailEnabled = courseData?.enrollment?.isEmailEnabled ?? false;

  const emailSettings = useEmailSettings();
  const unenrollModal = useUnenrollData();
  const handleToggleDropdown = useHandleToggleDropdown(cardId);
  const { shouldShowUnenrollItem, shouldShowDropdown } = useOptionVisibility(cardId);
  const isMasquerading = useIsMasquerading();

  if (!shouldShowDropdown) {
    return null;
  }

  return (
    <div className="d-flex gap-2">
      <IconButton 
          src={Share}
          iconAs={Icon}
          alt="Share"
          variant="primary"
          data-testid="share-course-button"
      />
      <Dropdown onToggle={handleToggleDropdown}>
        <Dropdown.Toggle
          id={`course-actions-dropdown-${cardId}`}
          as={IconButton}
          src={MoreVert}
          iconAs={Icon}
          variant="primary"
          alt={formatMessage(messages.dropdownAlt)}
        />
        <Dropdown.Menu>
          {shouldShowUnenrollItem && (
            <Dropdown.Item
              disabled={isMasquerading}
              onClick={unenrollModal.show}
              data-testid={testIds.unenrollModalToggle}
            >
              {formatMessage(messages.unenroll)}
            </Dropdown.Item>
          )}
          {/* <SocialShareMenu cardId={cardId} emailSettings={emailSettings} /> */}
        </Dropdown.Menu>
      </Dropdown>
      <UnenrollConfirmModal
        show={unenrollModal.isVisible}
        closeModal={unenrollModal.hide}
        cardId={cardId}
      />
      {isEmailEnabled && (
        <EmailSettingsModal
          show={emailSettings.isVisible}
          closeModal={emailSettings.hide}
          cardId={cardId}
        />
      )}
    </div>
  );
};
CourseCardMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMenu;
