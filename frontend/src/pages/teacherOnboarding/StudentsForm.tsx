import React from 'react';
import {
  Typography,
  Button,
  FormHelperText
} from '@mui/material';
import {
  Upload as UploadIcon,
  Add as AddIcon
} from '@mui/icons-material';
import * as Yup from 'yup';

import {
  Form,
  MultiValueTextField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

const StudentsForm: React.FC<{
  nextStep: () => void
}> = ({
  nextStep
}) => {
    interface Values {
      students: string
    }

    const initialValues: Values = {
      students: ''
    };

    return <>
      <Typography>
        Add the student names to the box with one name per line or separated by a comma.
      </Typography>
      <Typography>
        Student names and the class access code are required to sign in.
      </Typography>
      {/* TODO: call API */}
      <Button endIcon={
        <UploadIcon />
      }>
        Import CSV file
      </Button>
      <FormHelperText>
        Please note: if using the import option, student names must be under a heading labelled &apos;name&apos;.
      </FormHelperText>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: call backend
          console.log(values);
          setSubmitting(false);
          nextStep();
        }}
        stackProps={{
          gap: 3,
          alignItems: 'end',
          direction: { xs: 'column', md: 'row' },
          width: { xs: '100%', md: '75%' }
        }}
      >
        <MultiValueTextField
          required
          multiline
          rows={5}
          name='students'
          className='resize-vertical'
          placeholder='You can import names from a .CSV file, or copy and paste them from a spreadsheet directly into this text box'
          validate={Yup
            .string()
            .matches(/^[a-zA-Z0-9-_ ]{1,150}$/gm, 'Names may only contain letters, numbers, dashes, underscores, and spaces.')
          }
        />
        <SubmitButton endIcon={
          <AddIcon />
        }>
          Add students
        </SubmitButton>
      </Form>
    </>;
  };

export default StudentsForm;
