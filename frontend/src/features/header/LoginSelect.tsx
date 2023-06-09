import React from 'react';
import {
  Select,
  MenuItem,
  useTheme,
  inputClasses,
  outlinedInputClasses,
  menuClasses,
  selectClasses
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';

const LoginMenuItem: React.FC<{
  setOpen: (open: boolean) => void;
  href: string;
  children: string;
}> = ({
  setOpen,
  href,
  children
}) => {
    const theme = useTheme();

    const border = `2px solid ${theme.palette.secondary.main}`;

    return (
      <MenuItem
        onClick={() => {
          setOpen(false);
          window.location.href = href;
        }}
        sx={{
          borderLeft: border,
          borderRight: border,
          borderBottom: border,
          margin: 0,
          fontSize: '14px !important',
          ':hover': {
            textDecoration: 'underline',
            backgroundColor: 'transparent'
          }
        }}
      >
        {children}
        <ChevronRightIcon style={{
          marginLeft: 'auto'
        }} />
      </MenuItem>
    );
  };

const LoginSelect: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Select
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      IconComponent={({ className }: { className: string }) => {
        return className.includes(selectClasses.iconOpen)
          ? <ExpandLessIcon />
          : <ExpandMoreIcon />;
      }}
      displayEmpty
      value=''
      color='secondary'
      className={inputClasses.focused}
      inputProps={{
        MenuProps: {
          sx: {
            [`.${menuClasses.paper}`]: {
              borderRadius: '0px'
            }
          },
          MenuListProps: {
            style: {
              padding: 0,
              borderRadius: '0px'
            }
          }
        }
      }}
      SelectDisplayProps={{
        style: {
          padding: '0px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      }}
      sx={{
        minWidth: '150px',
        height: '42px',
        padding: '6px 16px',
        display: { xs: 'none', md: 'inline-flex' },
        [`.${outlinedInputClasses.notchedOutline}`]: {
          borderRadius: '0px'
        }
      }}
    >
      <MenuItem value='' sx={{ display: 'none' }}>
        Log in
      </MenuItem>
      <LoginMenuItem
        setOpen={setOpen}
        href={paths.login.teacher._}
      >
        Teacher
      </LoginMenuItem>
      <LoginMenuItem
        setOpen={setOpen}
        href={paths.login.student._}
      >
        Student
      </LoginMenuItem>
      <LoginMenuItem
        setOpen={setOpen}
        href={paths.login.independent._}
      >
        Independent
      </LoginMenuItem>
    </Select >
  );
};

export default LoginSelect;
