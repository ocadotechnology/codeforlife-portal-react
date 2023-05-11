import React from 'react';
import {
  Button,
  Stack,
  Typography,
  createTheme,
  useTheme,
  ThemeProvider,
  ThemeOptions,
  SxProps
} from '@mui/material';
import {
  Circle as CircleIcon,
  Hexagon as HexagonIcon
} from '@mui/icons-material';

import {
  Image,
  ImageProps
} from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';

const Status: React.FC<{
  forTeacher: boolean,
  header: string,
  body: string[],
  imageProps: ImageProps
}> = ({ forTeacher, header, body, imageProps }) => {
  const themeOptions: ThemeOptions = {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: forTeacher ? 'white' : 'black'
          }
        }
      }
    }
  };

  const commonIconSxProps: SxProps = {
    display: { xs: 'none', md: 'block' },
    fontSize: '200px',
    position: 'absolute'
  };

  return (
    <ThemeProvider theme={createTheme(useTheme(), themeOptions)}>
      <Stack
        paddingY={{ xs: 2, sm: 3, md: 5 }}
        paddingX={{ xs: 2, sm: 5, md: 10 }}
        alignItems='center'
        bgcolor={forTeacher ? '#ee0857' : '#ffc709'}
        position='relative'
      >
        <CircleIcon
          color={forTeacher ? 'secondary' : 'primary'}
          sx={{
            ...commonIconSxProps,
            top: '5%',
            left: '0%',
            transform: 'translate(-60%, 0%)'
          }}
        />
        <HexagonIcon
          color={forTeacher ? 'tertiary' : 'secondary'}
          sx={{
            ...commonIconSxProps,
            bottom: '5%',
            right: '0%',
            transform: 'translate(60%, 0%)'
          }}
        />
        <Typography variant='h4' paddingY={1} textAlign='center'>
          {header}
        </Typography>
        <Image
          maxWidth='100px'
          marginY={5}
          {...imageProps}
        />
        {body.map((text, index) =>
          <Typography key={index}>
            {text}
          </Typography>
        )}
        <Button
          href={paths.home}
          color={forTeacher ? 'tertiary' : 'white'}
          style={{ marginTop: 30 }}
        >
          Back to homepage
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default Status;
