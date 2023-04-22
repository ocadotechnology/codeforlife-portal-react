import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
  InputAdornment
} from '@mui/material';
import {
  EmailOutlined as EmailIcon
} from '@mui/icons-material';

import BasePage from 'pages/BasePage';
import PageSection from 'components/PageSection';

const Newsletter: React.FC = () => {
  const theme = useTheme();

  return (
    <BasePage containerProps={{ spacing: 0 }}>
      <PageSection bgcolor={theme.palette.info.main}>
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
          <Button type='submit'>
            Confirm
          </Button>
        </Stack>
      </PageSection>
    </BasePage>
  );
};

export default Newsletter;
