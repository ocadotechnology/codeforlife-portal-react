import React from 'react';
import {
  Button,
  Stack,
  Typography
} from '@mui/material';

import { Image, ImageProps } from 'codeforlife/lib/esm/components';
import { ThemedBox, ThemedBoxProps } from 'codeforlife/lib/esm/theme';

import { paths } from '../../app/router';
import { themeOptions } from '../../app/theme';

const Status: React.FC<{
  userType: ThemedBoxProps['userType'],
  header: string,
  body: string[],
  imageProps: ImageProps
}> = ({ userType, header, body, imageProps }) => {
  return (
    <ThemedBox
      withShapes
      options={themeOptions}
      userType={userType}
    >
      <Stack
        alignItems='center'
      >
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
          href={paths._}
          style={{ marginTop: 30 }}
        >
          Back to homepage
        </Button>
      </Stack>
    </ThemedBox>
  );
};

export default Status;
