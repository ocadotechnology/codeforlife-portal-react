import React from 'react';
import {
  Typography
} from '@mui/material';

import {
  Form,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

import SchoolNameField from '../../components/form/SchoolNameField';
import SchoolPostcodeField from '../../components/form/SchoolPostcodeField';
import SchoolCountryField from '../../components/form/SchoolCountryField';

const SchoolForm: React.FC<{
  onSubmit: () => void
}> = ({
  onSubmit
}) => {
    interface Values {
      school: string;
      postcode: string;
      country: string;
    }

    const initialValues: Values = {
      school: '',
      postcode: '',
      country: ''
    };

    return <>
      <Typography>
        As the first person from your school or club to register for Code for Life, by default, you become the organisation&apos;s administrator.
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
