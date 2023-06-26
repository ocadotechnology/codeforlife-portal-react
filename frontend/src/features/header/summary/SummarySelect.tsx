import React from 'react';
import {
  Select,
  MenuItem,
  MenuItemProps,
  outlinedInputClasses,
  selectClasses,
  svgIconClasses
} from '@mui/material';

import typography from 'codeforlife/lib/esm/theme/typography';

export interface SummarySelectProps {
  text: string;
  menuItemsProps: MenuItemProps[]
}

const SummarySelect: React.FC<SummarySelectProps> = ({
  text,
  menuItemsProps
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Select
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      displayEmpty
      value=''
      sx={{
        [`.${selectClasses.outlined}`]: {
          ...typography.body1,
          margin: 0,
          padding: 0,
          paddingRight: '16px !important'
        },
        [`.${svgIconClasses.root}`]: {
          right: '-6px'
        },
        [`.${outlinedInputClasses.notchedOutline}`]: {
          border: 'none !important'
        }
      }}
    >
      <MenuItem value='' style={{ display: 'none' }}>
        {text}
      </MenuItem>
      {menuItemsProps.map(({
        sx,
        ...otherMenuItemProps
      }, index) =>
        <MenuItem
          key={index}
          sx={{
            ...sx,
            fontSize: '14px !important',
            margin: 0,
            padding: '10px 26px',
            borderTop: 'none',
            ':hover': {
              textDecoration: 'underline',
              backgroundColor: 'transparent'
            }
          }}
          {...otherMenuItemProps}
        />
      )}
    </Select>
  );
};

export default SummarySelect;
