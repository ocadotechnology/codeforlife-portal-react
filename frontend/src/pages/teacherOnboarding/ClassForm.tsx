import {
  Typography
} from '@mui/material';
import React from 'react';

import {
  Form,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';
import { CreateResult } from 'codeforlife/lib/esm/helpers/rtkQuery';

import { Class, useLazyCreateClassQuery } from '../../app/api';
import ClassNameField from '../../components/form/ClassNameField';
import SeeClassmatesProgressField from '../../components/form/SeeClassmatesProgressField';

const ClassForm: React.FC<{
  teacherId: number;
  schoolId: number;
  onSubmit: (klass: CreateResult<Class>) => void;
}> = ({ teacherId, schoolId, onSubmit }) => {
  const [createClass] = useLazyCreateClassQuery();

  return <>
    <Typography>
      When you set up a new class, a unique class access code will automatically be generated, with you being identified as the teacher for that class.
    </Typography>
    <Form
      initialValues={{
        teacher: teacherId,
        name: '',
        classmatesDataViewable: false,
        acceptRequestsUntil: null
      }}
      onSubmit={submitForm(createClass, { then: onSubmit })}
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
