import React from 'react';
import {
  Typography
} from '@mui/material';

import {
  Form,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

import ClassNameField from '../../components/form/ClassNameField';
import SeeClassmatesProgressField from '../../components/form/SeeClassmatesProgressField';

const ClassForm: React.FC<{
  onSubmit: () => void
}> = ({
  onSubmit
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
          onSubmit();
        }}
        stackProps={{
          width: { xs: '100%', md: '50%' }
        }}
      >
        <ClassNameField />
        <SeeClassmatesProgressField />
        <SubmitButton>
          Create class
        </SubmitButton>
      </Form>
    </>;
  };

export default ClassForm;
