import { FC } from 'react';
import { Button } from '@openedx/paragon';
import { Link } from 'react-router-dom';

import { ProgressCardButtonProps } from '../../data/types';

export const ProgressCardButton: FC<ProgressCardButtonProps> = ({ variant, to, buttonText }) => {
  return (
    <Button variant={variant} to={to} as={Link}>
      {buttonText}
    </Button>
  );
};
