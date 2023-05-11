import React from 'react';
import BasePage from 'pages/BasePage';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import CflTable, { TableCellStyled, TableRowStyled } from 'components/CflTable';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { CreateOutlined } from '@mui/icons-material';
import { getClassesData, getUser } from './dummyMethods';
import { Form, Field, Formik } from 'formik';
import { CREATE_CLASS_INITIAL_VALUES } from './constants';
import { CREATE_CLASS_SCHEMA } from './schemas';
import CflTextField from 'components/formik/CflTextField';

const YourClasses: React.FC = (): JSX.Element => {
  return (
    <>
      <Typography align="center" variant="h5">
        Your classes
      </Typography>
      <Typography>
        Below is a list of all the classes in your school, including classes of
        other teachers. You can add a class or edit your existing classes. You
        can also accept or deny requests from independent students wanting to
        join one of your classes.
      </Typography>
    </>
  );
};

const ClassTable = (): JSX.Element => {
  const classData = getClassesData();
  const { firstName, lastName } = getUser();
  return (
    <CflTable titles={['Class name', 'Access code', 'Teacher', 'Action']}>
      {classData.map(({ className, accessCode, teacher }, keyIdx: number) => (
        <TableRowStyled key={`BodyTableRow${keyIdx}`}>
          <TableCellStyled>{className}</TableCellStyled>
          <TableCellStyled>{accessCode}</TableCellStyled>
          <TableCellStyled>
            {teacher === `${firstName} ${lastName}` ? 'You' : teacher}
          </TableCellStyled>
          <TableCellStyled align="center">
            <Button color="tertiary" endIcon={<CreateOutlined />}>
              Update details
            </Button>
          </TableCellStyled>
        </TableRowStyled>
      ))}
    </CflTable>
  );
};

const ExternalStudentsJoiningRequests: React.FC = (): JSX.Element => {
  return (
    <>
      <Typography align="center" variant="h5">
        External requests to join your classes
      </Typography>
      <Typography>
        External or independent students may request to join your classes if the
        student has been given a Class Access Code, and provided you have
        enabled external requests for that class.
      </Typography>
      <Typography fontWeight="bold">
        No student has currently requested to join your classes.
      </Typography>
    </>
  );
};

const CreateNewClassForm: React.FC = (): JSX.Element => {
  return (
    <Formik
      initialValues={CREATE_CLASS_INITIAL_VALUES}
      validationSchema={CREATE_CLASS_SCHEMA}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CflTextField
                name="className"
                placeholder="Class name"
                helperText="Enter a class name"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                name="teacherName"
                placeholder="Teacher's name"
                helperText="Enter the teacher's name"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="isStudentProgressVisibleToOthers"
                    />
                  }
                  label="Allow students to see their classmates' progress?"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  !(formik.isValid && formik.dirty) || formik.isSubmitting
                }
                type="submit"
                variant="contained"
                color="tertiary"
              >
                Create class
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const CreateNewClass: React.FC = (): JSX.Element => {
  return (
    <>
      <Typography align="center" variant="h5">
        Create a new class
      </Typography>
      <Typography>
        When you set up a new class, a unique class access code will
        automatically be generated for the teacher assigned to the class.
      </Typography>
      <CreateNewClassForm />
    </>
  );
};

const TeacherClasses: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your classes" />
      <Container>
        <YourClasses />
        <ClassTable />
        <ExternalStudentsJoiningRequests />
        <CreateNewClass />
      </Container>
    </BasePage>
  );
};

export default TeacherClasses;
