import React from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button
} from '@mui/material';
import * as yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { Image } from 'codeforlife/lib/esm/components';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import { paths } from '../../app/router';
import ErrorProps, {
  forbidden403,
  pageNotFound404,
  tooManyRequests429,
  internalServerError500
} from './ErrorProps';

const Error: React.FC = () => {
  const navigate = useNavigate();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      type: yup.string()
        .oneOf([
          '403', 'forbidden',
          '404', 'page-not-found',
          '429', 'too-many-requests',
          '500', 'internal-server-error'
        ] as const)
        .required()
        .default('page-not-found'),
      userType: yup.string()
        .oneOf([
          'teacher',
          'independent',
          'student'
        ] as const)
        .when('type', {
          is: (type: string) => ['429', 'too-many-requests'].includes(type),
          then: (schema) => schema.required()
        })
    }),
    {
      // Special case. Don't redirect to an error page - we're already here.
      onError: () => ({ type: 'internal-server-error' as const })
    }
  );

  let errorProps: ErrorProps;
  switch (params.type) {
    case '403':
    case 'forbidden':
      errorProps = forbidden403();
      break;
    case '404':
    case 'page-not-found':
      errorProps = pageNotFound404();
      break;
    case '429':
    case 'too-many-requests':
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      errorProps = tooManyRequests429(params.userType!);
      break;
    case '500':
    case 'internal-server-error':
      errorProps = internalServerError500();
      break;
  }

  return (
    // Error page should not make HTTP requests.
    <Page.Container>
      <Page.Section>
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
                onClick={() => { navigate(paths._); }}
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
            <Image {...errorProps.imageProps} />
          </Grid>
        </Grid>
      </Page.Section>
    </Page.Container>
  );
};

export default Error;
