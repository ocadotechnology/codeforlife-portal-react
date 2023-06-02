import React, { useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Breakpoint,
  Stack,
  Container,
  useTheme
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

const MessageBanner: React.FC = () => {
  const theme = useTheme();
  const messageTag = 'info';
  const message = 'message';
  const [showBanner, setShowBanner] = useState(false);

  const handleClose = (): void => {
    setShowBanner(false);
  };

  return (
    showBanner
      ? <Grid container xs={12} style={{ backgroundColor: theme.palette.tertiary.main }} alignItems='center'>
        <Container maxWidth={process.env.REACT_APP_CONTAINER_MAX_WIDTH as Breakpoint}>
          <Stack direction='row' alignItems='center'>
            {(messageTag.includes('error') || messageTag.includes('warning'))
              ? <ErrorOutlineOutlinedIcon />
              : <InfoOutlinedIcon />
            }
            <Typography marginX={2} marginY={2} sx={{ flexGrow: 1 }}>
              {message}
            </Typography>
            <CloseIcon onClick={handleClose} />
          </Stack>
        </Container>
      </Grid>
      : null
  );
};

export default MessageBanner;
