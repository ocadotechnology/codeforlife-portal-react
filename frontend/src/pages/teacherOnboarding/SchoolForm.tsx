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
import { useCreateOrganisationMutation } from '../../app/api/endpoints/organisation';

const SchoolForm: React.FC<{
  onSubmit: () => void
}> = ({
  onSubmit
}) => {
    interface Values {
      name: string;
      postcode: string;
      country: string;
    }

    const initialValues: Values = {
      name: '',
      postcode: '',
      country: ''
    };

    const [createOrganisation] = useCreateOrganisationMutation();

    return <>
      <Typography>
        As the first person from your school or club to register for Code for Life, by default, you become the organisation&apos;s administrator.
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => {
          createOrganisation(values).unwrap()
            .then(() => {
              onSubmit();
            })
            .catch((err) => { console.error('CreateOrganisation submit error: ', err); });
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
