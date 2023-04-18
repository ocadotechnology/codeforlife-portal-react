import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import BasePage from 'pages/BasePage';
import PageSection from 'components/PageSection';

const ConsentForm: React.FC = () => {
  return (
    <Stack spacing={2} p={3}>
      <Typography variant='h3'>
        Your communication preferences
      </Typography>
      <Typography>
        Email
      </Typography>
      <Grid xs={12}>
        <TextField
          required
          id='email'
          label='your.name@yourdomain.com'
          type='email'
        />
      </Grid>
      <Grid xs={12} sm={10}>
        <FormControlLabel
          control={<Checkbox required />}
          label='I confirm that I am happy to continue receiving email communication from Code for Life.'
        />
      </Grid>
      <Grid xs={12} sm={2} paddingBottom={2}>
        <Button type='submit' fullWidth>
          Confirm
        </Button>
      </Grid>
    </Stack>
  );
};

const NewsLetter: React.FC = () => {
  const theme = useTheme();
  return (
    <BasePage containerProps={{ spacing: 0 }}>
      <PageSection bgcolor={theme.palette.info.main}>
        <ConsentForm />
      </PageSection>
    </BasePage>
  );
};

export default NewsLetter;
