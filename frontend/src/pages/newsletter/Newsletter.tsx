import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
  InputAdornment
} from '@mui/material';
import {
  EmailOutlined as EmailIcon
} from '@mui/icons-material';

import Page from 'codeforlife/lib/esm/components/page';

const Newsletter: React.FC = () => {
  const theme = useTheme();

  return (
    <Page.Container spacing={0}>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Stack>
          <Typography variant='h3'>
            Your communication preferences
          </Typography>
          <TextField
            required
            id='email'
            label='Email'
            type='email'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />
          <FormControlLabel
            control={<Checkbox required />}
            label='I confirm that I am happy to continue receiving email communication from Code for Life.'
          />
          <Button type='submit' sx={{ my: 2 }}>
            Confirm
          </Button>
        </Stack>
      </Page.Section>
    </Page.Container>
  );
};

export default Newsletter;
