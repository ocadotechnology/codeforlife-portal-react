import { Link, useTheme } from '@mui/material';
import React from 'react';

interface BackToLinkTextButtonProps {
  href: string;
  text: string;
}

const BackToLinkTextButton: React.FC<BackToLinkTextButtonProps> = ({
  href,
  text
}) => {
  const theme = useTheme();
  return (
    <Link color={theme.palette.common.black} underline="hover" href={href}>
      {'<'} Back to {text}
    </Link>
  );
};

export default BackToLinkTextButton;
