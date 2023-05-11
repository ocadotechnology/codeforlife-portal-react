import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  FormControl,
  FormControlLabel,
  MenuItem,
  FormGroup,
  Stack,
  FormHelperText,
  Checkbox,
  useTheme
} from '@mui/material';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import BasePage from 'pages/BasePage';
import React from 'react';
import { Create } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import { INVITE_TEACHER_SCHEMA, SCHOOL_DETAILS_UPDATE_SCHEMA } from './schemas';
import {
  COUNTRY_LIST,
  INVITE_TEACHER_INITIAL_VALUES,
  SCHOOL_DETAILS_INITIAL_VALUES
} from './constants';
import CflTable, { TableCellStyled, TableRowStyled } from 'components/CflTable';
import { getSchool, getTeachersData } from './dummyMethods';
import CflTextField from 'components/formik/CflTextField';
import CflCheckboxField from 'components/formik/CflCheckboxField';

const InviteTeacherForm: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Formik
      initialValues={INVITE_TEACHER_INITIAL_VALUES}
      validationSchema={INVITE_TEACHER_SCHEMA}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <Grid container columnSpacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Teacher's first name"
                helperText="Enter the teacher's name"
                name="teacherFirstName"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Teacher's last name"
                helperText="Enter the teacher's last name"
                name="teacherLastName"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Teacher's email"
                helperText="Enter the teacher's email"
                name="teacherEmail"
                size="small"
              />
            </Grid>
            <Grid alignItems="center" item xs={12}>
              <CflCheckboxField
                name="isAdmin"
                sx={{ color: theme.palette.info.dark }}
                formControlLabelProps={{
                  label: 'Make an administrator of the school'
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button variant="contained" color="tertiary" type="submit">
            Invite teacher
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const UpdateSchoolDetailsForm: React.FC = (): JSX.Element => {
  const { schoolName, schoolPostcode, schoolCountry } = getSchool();
  return (
    <Formik
      initialValues={{
        ...SCHOOL_DETAILS_INITIAL_VALUES,
        schoolCountry,
        schoolPostcode,
        schoolName
      }}
      validationSchema={SCHOOL_DETAILS_UPDATE_SCHEMA}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Name of school or club"
                helperText="Enter your school's name"
                name="schoolName"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Postcode / Zipcode"
                helperText="Enter your school's postcode"
                name="schoolPostcode"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="outlined"
                required
                color="primary"
              >
                <Field
                  as={Select}
                  defaultValue={COUNTRY_LIST[0]}
                  required
                  color="primary"
                  name="schoolCountry"
                  size="small"
                >
                  {COUNTRY_LIST.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Field>
                <FormHelperText>
                  Select your school&apos;s country
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="tertiary">
                Update details
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
const TeachersTable: React.FC = (): JSX.Element => {
  const teachersData = getTeachersData();
  return (
    <CflTable titles={['Name', 'Administrator status', 'Actions']}>
      {teachersData.map(({ name, isAdmin, email }, keyIdx: number) => (
        <TableRowStyled key={`BodyTableRow${keyIdx}`}>
          <TableCellStyled>{name}</TableCellStyled>
          <TableCellStyled>
            {isAdmin ? 'Teacher Administrator' : 'Teacher'} ({email})
          </TableCellStyled>
          <TableCellStyled align="center">
            <Button endIcon={<Create />} color="tertiary">
              Update details
            </Button>
          </TableCellStyled>
        </TableRowStyled>
      ))}
    </CflTable>
  );
};
const TeacherSchool: React.FC = (): JSX.Element => {
  const { schoolName, accessCode } = getSchool();

  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your school" />
      <Container>
        <Grid container columnSpacing={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              Your school: {schoolName}: {accessCode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              As an administrator of your school or club, you can select other
              teachers to whom you can provide or revoke administrative rights.
              You can also add and remove teachers from your school or club. As
              administrator, you have the ability to see and amend other
              teachers&apos; classes. Please bear this in mind when assigning
              admin rights to other teachers.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <InviteTeacherForm />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              These teachers are already part of your school or club
            </Typography>
            <TeachersTable />
          </Grid>
          <Grid item sm={6}>
            <Typography>
              Select &apos;Delete&apos; to delete a teacher from your school or
              club. You will be able to move any existing classes assigned to
              that teacher to other teachers in your school or club.
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography fontWeight="bold" color="error">
              We strongly recommend that administrators who are using 2FA ensure
              there is another administrator who will be able to disable their
              2FA should they have problems with their smartphone or tablet.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Update details of your school or club
            </Typography>
            <Typography variant="body1">
              Update your school or club&apos;s name and/or postcode.
            </Typography>
            <UpdateSchoolDetailsForm />
          </Grid>
        </Grid>
      </Container>
    </BasePage>
  );
};

export default TeacherSchool;
