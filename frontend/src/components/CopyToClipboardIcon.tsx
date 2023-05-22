import { ContentCopy } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from '@mui/material';

const CopyContentIconStyled = styled(ContentCopy)(({ theme }) => ({
  color: theme.palette.info.dark,
  transition: `${theme.transitions.duration.standard}ms`,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.common.black
  }
}));

const CopyToClipboardIcon: React.FC<{
  accessCode: string;
}> = ({ accessCode }) => {
  const [copiedMessage, setCopiedMessage] = React.useState('Copy to clipboard');
  const handleCopy: () => void = () => {
    setCopiedMessage('Copied to clipboard!');
  };
  const resetMessage: () => void = () => {
    setCopiedMessage('Copy to clipboard');
  };
  return (
    <CopyToClipboard text={accessCode} onCopy={handleCopy}>
      <Tooltip title={copiedMessage} placement="bottom">
        <CopyContentIconStyled onMouseEnter={resetMessage} />
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyToClipboardIcon;
