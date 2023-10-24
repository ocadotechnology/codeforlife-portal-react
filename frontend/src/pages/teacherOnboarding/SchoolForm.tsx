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

import { School, useLazyCreateSchoolQuery } from '../../app/api';
import SchoolCountryField from '../../components/form/SchoolCountryField';
import SchoolNameField from '../../components/form/SchoolNameField';
import SchoolPostcodeField from '../../components/form/SchoolPostcodeField';

const SchoolForm: React.FC<{
  onSubmit: (school: CreateResult<School>) => void;
}> = ({ onSubmit }) => {
  const [createSchool] = useLazyCreateSchoolQuery();

  return <>
    <Typography>
      As the first person from your school or club to register for Code for Life, by default, you become the organisation&apos;s administrator.
    </Typography>
    <Form
      initialValues={{
        name: '',
        postcode: '',
        country: '',
        county: null
      }}
      onSubmit={submitForm(createSchool, { then: onSubmit })}
      stackProps={{
        width: { xs: '100%', md: '50%' }
      }}
    >
      <SchoolNameField />
      <SchoolPostcodeField />
      <SchoolCountryField />
      <SubmitButton>
        Create school or club
      </SubmitButton>
    </Form>
  </>;
};

export default SchoolForm;
