import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';
import {
  Form,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';

import { accessCodeSchema } from '../../../app/schemas';
import {
  useIsRequestingToJoinSchoolQuery,
  useJoinSchoolRequestMutation,
  useRevokeSchoolRequestMutation
} from '../../../app/api';
import { getSchool } from '../../teacherDashboard/dummyMethods';

const JoinSchool: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    accessCode: ''
  };

  const [requestJoinSchool] = useJoinSchoolRequestMutation();
  const [revokeJoinSchool] = useRevokeSchoolRequestMutation();
  const { accessCode } = getSchool();
  const { data = { isPending: false, accessCode: '' }, refetch } = useIsRequestingToJoinSchoolQuery(null);

  return (
    <Page.Section>
      <Typography align="center" variant="h4">
        Join a school or club
      </Typography>
      {data.isPending
        ? <>
          <Typography variant="h5">Request pending</Typography>
          {/* TODO: Fetch actual values from backend. */}
          <Typography>
            Your request to join class {accessCode} in the school or club Code
            for Life School is still pending.
          </Typography>
          <Typography>
            The teacher for that class must review and approve the request to
            complete the process.
          </Typography>
          <Typography>
            If successful, the teacher will then contact you with your new login
            details.
          </Typography>
          <Typography>
            <strong>Warning:</strong> once the teacher accepts you to their
            class, that teacher and the school or club will manage your account.
          </Typography>
          <Typography>
            You may cancel your request now, before the teacher makes their
            decision.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                revokeJoinSchool({ accessCode })
                  .unwrap().then(refetch).catch((error) => { console.log(error); });
              }}

            >
              Cancel request
            </Button>
          </Stack>
        </>
        : <>
          <Typography variant="h5">Request to join a school or club</Typography>
          <Typography>
            If you want to link your Code For Life account with a school or
            club, ask a teacher to enable external requests and provide you with
            the Class Access Code for the class you want to join. Simply add the
            Class Access Code to the form below and submit.
          </Typography>
          <Typography>
            <strong>Warning:</strong> once the teacher accepts you to their
            class, that teacher and the school or club will manage your account.
          </Typography>
          <Typography>
            If successful, the teacher will contact you with your new login
            details.
          </Typography>

          <Form
            initialValues={initialValues}
            onSubmit={() => {
              requestJoinSchool({
                accessCode
              })
                .unwrap().then(refetch).catch((error) => { console.log(error); });
            }}
          >
            <TextField
              placeholder="Class code"
              helperText="Enter class code"
              name="accessCode"
              sx={{ width: { xs: '100%', sm: '50%' } }}
              validate={accessCodeSchema}
              required
            />

            <Stack direction="row" spacing={2} paddingY={3}>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <SubmitButton>Request</SubmitButton>
            </Stack>
          </Form>
        </>
      }
    </Page.Section >
  );
};

export default JoinSchool;
