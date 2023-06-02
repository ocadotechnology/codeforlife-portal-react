import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';
import { SearchParams } from 'codeforlife/lib/esm/helpers';

import { paths } from '../../app/router';
import PageSection from '../../components/PageSection';
import BasePage from '../BasePage';
import ErrorProps, {
  forbidden403,
  pageNotFound404,
  tooManyRequests429,
  internalServerError500
} from './ErrorProps';

const Error: React.FC = () => {
  const errorTypes = [
    '403', 'forbidden',
    '404', 'pageNotFound',
    '429', 'tooManyRequests',
    '500', 'internalServerError'
  ] as const;

  const userTypes = [
    'teacher',
    'independent'
  ] as const;

  let params = SearchParams.get<{
    type: typeof errorTypes[number],
    userType?: typeof userTypes[number]
  }>({
    type: {
      validate: SearchParams.validate.inOptions(errorTypes)
    },
    userType: {
      validate: SearchParams.validate.inOptions(userTypes),
      isRequired: false
    }
  });

  if (params === null || (
    ['429', 'tooManyRequests'].includes(params.type) &&
    params.userType === undefined
  )) {
    // Special case. Don't redirect to an error page - we're already here.
    params = { type: 'internalServerError' };
  }

  let errorProps: ErrorProps;
  switch (params.type) {
    case '403':
    case 'forbidden':
      errorProps = forbidden403();
      break;
    case '404':
    case 'pageNotFound':
      errorProps = pageNotFound404();
      break;
    case '429':
    case 'tooManyRequests':
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      errorProps = tooManyRequests429(params.userType!);
      break;
    case '500':
    case 'internalServerError':
      errorProps = internalServerError500();
      break;
  }

  return (
    <BasePage>
      <PageSection>
        <Grid container>
          <Grid
            xs={12} sm={8}
            order={{ xs: 2, sm: 1 }}
            className='flex-center-y'
          >
            <Stack>
              <Typography variant='h2'>
                {errorProps.header}
              </Typography>
              <Typography variant='h5'>
                {errorProps.subheader}
              </Typography>
              <Typography>
                {errorProps.body}
              </Typography>
              <Button
                sx={{ mb: { xs: 1, sm: 0 } }}
                href={paths._}
              >
                Back to homepage
              </Button>
            </Stack>
          </Grid>
          <Grid
            xs={12} sm={4}
            order={{ xs: 1, sm: 2 }}
            className='flex-center'
          >
            <Image
              {...errorProps.imageProps}
              maxWidth='200px'
            />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default Error;
