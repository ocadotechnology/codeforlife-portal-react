import {
  Add as AddIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import {
  Button,
  FormHelperText,
  Typography
} from '@mui/material';
import React from 'react';
import * as Yup from 'yup';

import {
  Form,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';
import { setFormErrors } from 'codeforlife/lib/esm/helpers/formik';
import {
  BulkCreateResult
} from 'codeforlife/lib/esm/helpers/rtkQuery';

import { useLazyBulkCreateUsersQuery, User } from '../../app/api';

export interface AddStudentsFormProps {
  onSubmit: (users: BulkCreateResult<User>) => void;
}

const AddStudentsForm: React.FC<AddStudentsFormProps> = ({
  onSubmit
}) => {
  const [bulkCreateUsers] = useLazyBulkCreateUsersQuery();

  return <>
    <Typography>
      Add the student names to the box with one name per line or separated by a comma.
    </Typography>
    <Typography>
      Student names and the class access code are required to sign in.
    </Typography>
    {/* TODO: call API */}
    <Button
      endIcon={<UploadIcon />}
      variant='outlined'
      className='body'
    >
      Import CSV file
    </Button>
    <FormHelperText>
      Please note: if using the import option, student names must be under a heading labelled &apos;name&apos;.
    </FormHelperText>
    <Form
      initialValues={{ students: [] as string[] }}
      onSubmit={({ students }, { setErrors }) => {
        // TODO: convert students to data.
        bulkCreateUsers({ data: [] })
          .unwrap()
          .then(onSubmit)
          .catch((error) => { setFormErrors(error, setErrors); });
      }}
      stackProps={{
        gap: 3,
        alignItems: 'end',
        direction: { xs: 'column', md: 'row' },
        width: { xs: '100%', md: '75%' }
      }}
    >
      <TextField
        split={/\r\n|\n|\r|,/}
        required
        multiline
        rows={5}
        name='students'
        className='resize-vertical'
        placeholder='You can import names from a .CSV file, or copy and paste them from a spreadsheet directly into this text box'
        validate={Yup
          .array()
          .of(Yup
            .string()
            .matches(/^.*?\b[a-zA-Z0-9-_ ]{1,150}$/gm, 'Names may only contain letters, numbers, dashes, underscores, and spaces.')
          )
        }
      />
      <SubmitButton endIcon={<AddIcon />}>
        Add students
      </SubmitButton>
    </Form>
  </>;
};

export default AddStudentsForm;
