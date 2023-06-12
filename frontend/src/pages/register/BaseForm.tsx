import React from 'react';
import {
  Stack,
  StackProps,
  Typography,
  FormHelperText
} from '@mui/material';

import { ThemedBox, ThemedBoxProps } from 'codeforlife/lib/esm/theme';

import { themeOptions } from '../../app/theme';

const BaseForm: React.FC<{
  header: string,
  subheader: string,
  description: string,
  userType: ThemedBoxProps['userType'],
  children: StackProps['children'],
  color: string
}> =
  ({
    header,
    subheader,
    description,
    userType,
    children,
    color
  }) => (
    <ThemedBox options={themeOptions} userType={userType}>
      <Stack p={3} height='100%'>
        <Typography variant='h4' textAlign='center'>
          {header}
        </Typography>
        <Typography>
          {subheader}
        </Typography>
        <FormHelperText style={{ marginBottom: 30 }}>
          {description}
        </FormHelperText>
        {children}
      </Stack>
    </ThemedBox>
  );

export default BaseForm;
