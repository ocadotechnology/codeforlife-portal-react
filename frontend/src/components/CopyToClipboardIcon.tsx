import { ContentCopy } from '@mui/icons-material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip, Box, BoxProps } from '@mui/material';

const CopyContentIconStyled = styled(ContentCopy)(({ theme }) => ({
  color: theme.palette.info.dark,
  transition: `${theme.transitions.duration.standard}ms`,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.common.black
  }
}));

const CopyToClipboardIcon: React.FC<{
  stringToCopy: string;
  sx?: BoxProps;
}> = ({ stringToCopy, sx }) => {
  const [copiedMessage, setCopiedMessage] = React.useState('Copy to clipboard');
  const handleCopy: () => void = () => {
    setCopiedMessage('Copied to clipboard!');
  };
  const resetMessage: () => void = () => {
    setCopiedMessage('Copy to clipboard');
  };
  return (
    <Box sx={sx}>
      <CopyToClipboard text={stringToCopy} onCopy={handleCopy}>
        <Tooltip title={copiedMessage} placement="bottom">
          <CopyContentIconStyled onMouseEnter={resetMessage} />
        </Tooltip>
      </CopyToClipboard>
    </Box>
  );
};

export default CopyToClipboardIcon;
