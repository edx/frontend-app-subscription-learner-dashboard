import { FC } from 'react';
import { Button, StandardModal, useToggle, ActionRow } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { Link } from 'react-router-dom';

import { ProgressCardButtonProps } from '../../data/types';
import messages from '../messages';

export const ProgressCardButton: FC<ProgressCardButtonProps> = ({ variant, redirectUrl, buttonText, type, title, price, courseUrl }) => {
  const [isOpen, open, close] = useToggle(false);
  const { formatMessage } = useIntl();
  const isUpgradeButton = type === 'upgrade' && courseUrl; // TODO : Check needs to be added to open this modal only when Upgrade api is as success

  if (redirectUrl) {
    return (
      <Button variant={variant} as={Link} to={redirectUrl}>
        {buttonText}
      </Button>
    );
  }

  if (isUpgradeButton) {
    return (
      <>
        {/* TODO rerender the page after upgrade. This is the modal after clicking the upgrade button and the upgrade is successful.
        Also, work is needed on what should happen if the upgrade fails, once confirmed */}
        <Button variant={variant} onClick={open}>{buttonText}</Button>
        <StandardModal
          title={formatMessage(messages.programProgressInProgressCourseProfessionalUpgradeModalTitle, { title })}
          isOpen={isOpen}
          onClose={close}
          hasCloseButton={false}
          className="program-progress-upgrade-modal"
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={close}>Close</Button>
              <Button
                as={Link}
                to={courseUrl!}
                variant="brand"
                data-testid="action-row-btn"
              >
                {formatMessage(messages.programProgressCardResumeCourseButton)}
              </Button>
            </ActionRow>
          )}
          isOverflowVisible={false}
        >
          <p>
            {formatMessage(messages.programProgressInProgressCourseProfessionalUpgradeModalContent, { price })}
          </p>
        </StandardModal>
      </>
    );
  }

  return (
    <Button variant={variant}>
      {buttonText}
    </Button>
  );
};
