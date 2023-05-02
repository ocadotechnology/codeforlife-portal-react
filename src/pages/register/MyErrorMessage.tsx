import { ErrorMessage } from 'formik';
import {
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';

const MyErrorMessage: React.FC<{
  fieldName: string
  color: string
}> = ({ fieldName, color }) => {
  return (
    <ErrorMessage name={fieldName} >
      {msg =>
        <Typography variant="body1"
          color={color}
          fontStyle="italic" > {msg}
        </Typography>
      }
    </ErrorMessage>
  );
}

export default MyErrorMessage;
