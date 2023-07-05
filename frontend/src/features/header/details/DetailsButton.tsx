import React from 'react';
import {
  Button,
  ButtonProps
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { wrap } from 'codeforlife/lib/esm/helpers';

import HeaderContext from '../HeaderContext';

export interface DetailsButtonProps extends ButtonProps {
  spacing?: number;
  bgcolor?: {
    main: string;
    contrastText: string;
  };
}

const DetailsButton: React.FC<DetailsButtonProps> = ({
  spacing = 1,
  bgcolor,
  sx,
  onClick,
  ...otherButtonProps
}) => {
  // @ts-expect-error value is set
  const { setExpanded } = React.useContext(HeaderContext);

  return (
    <Button
      {...otherButtonProps}
      variant='text'
      endIcon={<ChevronRightIcon />}
      onClick={wrap({
        before: () => { setExpanded(false); }
      }, onClick)}
      sx={{
        ...sx,
        ...(bgcolor !== undefined && {
          bgcolor: bgcolor.main,
          ':hover': {
            bgcolor: bgcolor.main
          },
          color: `${bgcolor.contrastText} !important`
        }),
        paddingTop: '24px !important',
        paddingBottom: '24px !important',
        paddingRight: '12px !important',
        paddingLeft: `${12 * spacing}px !important`
      }}
    />
  );
};

export default DetailsButton;
