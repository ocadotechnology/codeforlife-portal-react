import React from 'react';
import {
  Typography,
  FormHelperText
} from '@mui/material';

import { ThemedBox, ThemedBoxProps } from 'codeforlife/lib/esm/theme';

import { themeOptions } from '../../app/theme';

const BaseForm: React.FC<ThemedBoxProps & {
  header: string,
  subheader: string,
  description: string,
}> = ({
  header,
  subheader,
  description,
  userType,
  children
}) => (
    <ThemedBox
      options={themeOptions}
      userType={userType}
      height='100%'
      p={5}
    >
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
    </ThemedBox>
  );

export default BaseForm;
