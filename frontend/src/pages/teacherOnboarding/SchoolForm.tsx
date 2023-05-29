import React from 'react';
import {
  Typography,
  InputAdornment
} from '@mui/material';
import {
  Business as BusinessIcon
} from '@mui/icons-material';
import { getNames } from 'country-list';

import {
  Form,
  TextField,
  AutocompleteField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

const SchoolForm: React.FC<{
  nextStep: () => void
}> = ({
  nextStep
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
          nextStep();
        }}
        stackProps={{
          width: { xs: '100%', md: '50%' }
        }}
      >
        <TextField
          required
          name='school'
          helperText='Name of school or club'
          placeholder='Name of school or club'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <BusinessIcon />
              </InputAdornment>
            )
          }}
        />
        <TextField
          required
          name='postcode'
          helperText='Postcode / Zipcode'
          placeholder='Postcode / Zipcode'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <BusinessIcon />
              </InputAdornment>
            )
          }}
        />
        <AutocompleteField
          options={getNames()}
          textFieldProps={{
            required: true,
            name: 'country',
            helperText: 'Country',
            placeholder: 'Country'
          }}
        />
        <SubmitButton>
          Create school or club
        </SubmitButton>
      </Form>
    </>;
  };

export default SchoolForm;
