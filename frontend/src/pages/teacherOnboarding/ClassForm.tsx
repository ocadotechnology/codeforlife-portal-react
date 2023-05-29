import React from 'react';
import {
  Typography,
  InputAdornment
} from '@mui/material';
import {
  PeopleAlt as PeopleAltIcon
} from '@mui/icons-material';

import {
  Form,
  TextField,
  CheckboxField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

const ClassForm: React.FC<{
  nextStep: () => void
}> = ({
  nextStep
}) => {
    interface Values {
      class: string;
      seeClassmates: boolean;
    }

    const initialValues: Values = {
      class: '',
      seeClassmates: false
    };

    return <>
      <Typography>
        When you set up a new class, a unique class access code will automatically be generated, with you being identified as the teacher for that class.
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: call backend
          console.log(values);
          setSubmitting(false);
          nextStep();
        }}
        stackProps={{
          width: { xs: '100%', md: '50%' }
        }}
      >
        <TextField
          required
          name='class'
          placeholder='Class name'
          helperText='Enter a class name'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <PeopleAltIcon />
              </InputAdornment>
            )
          }}
        />
        <CheckboxField
          name='seeClassmates'
          formControlLabelProps={{
            label: 'Allow students to see their classmates\' progress?'
          }}
        />
        <SubmitButton>
          Create class
        </SubmitButton>
      </Form>
    </>;
  };

export default ClassForm;
