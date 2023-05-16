import React from 'react';
import {
  Tooltip,
  TooltipProps
} from '@mui/material';

export interface CflTooltipProps extends TooltipProps { }

const CflTooltip: React.FC<CflTooltipProps> = ({
  onClick,
  ...otherTooltipProps
}) => {
  const [open, setOpen] = React.useState(false);

  onClick = () => { setOpen(!open); };

  return (
    <Tooltip
      open={open}
      onMouseOver={() => {
        if (!open) { setOpen(true); }
      }}
      onMouseLeave={() => { setOpen(false); }}
      onClick={onClick}
      {...otherTooltipProps}
    />
  );
};

export default CflTooltip;
