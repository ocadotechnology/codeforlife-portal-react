import {
  Button,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import {
  AutocompleteField,
  CheckboxField,
  Form,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { ContainerState } from 'codeforlife/lib/esm/components/page';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';

import { useUpdateClassMutation } from '../../../../../app/api';
import { paths } from '../../../../../app/router';
import ClassNameField from '../../../../../components/form/ClassNameField';

interface UpdateClassFormProps {
  accessCode: string;
  name: string;
  classmateProgress: boolean;
  externalRequestsMessage: string;
}

const UpdateClassForm: React.FC<UpdateClassFormProps> = ({
  accessCode,
  name,
  classmateProgress,
  externalRequestsMessage
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [updateClass] = useUpdateClassMutation();

  const externalRequestOptions: Record<string, string> = {
    '': 'Don\'t change my current setting',
    0: 'Don\'t allow external requests to this class',
    1: 'Allow external requests to this class for the next hour',
    4: 'Allow external requests to this class for the next 4 hours',
    8: 'Allow external requests to this class for the next 8 hours',
    12: 'Allow external requests to this class for the next 12 hours',
    16: 'Allow external requests to this class for the next 16 hours',
    20: 'Allow external requests to this class for the next 20 hours',
    24: 'Allow external requests to this class for the next 24 hours',
    48: 'Allow external requests to this class for the next 2 days',
    72: 'Allow external requests to this class for the next 3 days',
    96: 'Allow external requests to this class for the next 4 days',
    1000: 'Always allow external requests to this class (not recommended)'
  };

  function navigateToEditClassPage(state?: ContainerState): void {
    navigate(
      generatePath(
        paths.teacher.dashboard.classes.editClass._,
        { accessCode }
      ),
      { state }
    );
  }

  return (
    <Form
      initialValues={{
        accessCode,
        classEditSubmit: true,
        name,
        classmateProgress,
        externalRequests: ''
      }}
      onSubmit={submitForm(updateClass, {
        then: () => {
          navigateToEditClassPage({
            notifications: [
              {
                props: {
                  children: 'The class\'s settings have been changed successfully.'
                }
              }
            ]
          });
        }
      })}
    >
      <Grid container columnSpacing={2}>
        <Grid xs={12} sm={6}>
          <ClassNameField name='name' />
        </Grid>
        <Grid xs={12} sm={6}>
          <CheckboxField
            name="classmateProgress"
            formControlLabelProps={{
              label: "Allow students to see their classmates' progress."
            }}
          />
        </Grid>
      </Grid>
      <Stack spacing={3}>
        <Typography marginTop={theme.spacing(5)} variant="h5">
          External requests setting
        </Typography>
        <Typography>
          You can set up permissions for this class allowing students to
          send requests asking to join your class from outside of your
          school or club.
        </Typography>
        <Typography marginTop={theme.spacing(1)} fontWeight="bold">
          {externalRequestsMessage}
        </Typography>
        <Typography marginTop={theme.spacing(2)}>
          Set up external requests to this class
        </Typography>
        <Grid container>
          <Grid xs={6}>
            <AutocompleteField
              selectOnly
              options={Object.keys(externalRequestOptions)}
              getOptionLabel={(option) => externalRequestOptions[option]}
              textFieldProps={{
                name: 'externalRequests',
                helperText: 'Choose your setting'
              }}
            />
          </Grid>
          <Grid xs={6}></Grid>
        </Grid>
        <Stack
          gap={3}
          direction="row"
          justifyContent="flex-start"
          marginTop={theme.spacing(3)}
        >
          <Button
            variant="outlined"
            onClick={() => { navigateToEditClassPage(); }}
          >
            Cancel
          </Button>
          <SubmitButton>
            Update
          </SubmitButton>
        </Stack>
      </Stack>
    </Form>
  );
};

export default UpdateClassForm;
