import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { ErrorMessage } from 'formik';

const CflErrorMessage: React.FC<{
  fieldName: string
  color?: string
}> = ({ fieldName, color }) => {
  const theme = useTheme();
  const msgColor = (color === undefined) ? theme.palette.error.light : color;

  return (
    <ErrorMessage name={fieldName} >
      {msg =>
        <Typography variant="body1"
          color={msgColor}
          fontStyle="italic">
          {msg}
        </Typography>
      }
    </ErrorMessage>
  );
};

export default CflErrorMessage;
