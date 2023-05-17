import React from 'react';
import BasePage from '../BasePage';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import CflTable, {
  CflTableBody,
  CflTableCellElement
} from '../../components/CflTable';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Add, CreateOutlined, DoNotDisturb } from '@mui/icons-material';
import { getClassesData, getTeachersData, getUser } from './dummyMethods';
import { CREATE_CLASS_INITIAL_VALUES } from './constants';
import { CREATE_CLASS_SCHEMA } from './schemas';
import CflTextField from '../../components/formik/CflTextField';
import { CflHorizontalForm } from '../../components/formik/CflForm';
import CflCheckboxField from '../../components/formik/CflCheckboxField';
import CopyToClipboardIcon from '../../components/formik/CopyToClipboardIcon';
import PageSection from '../../components/PageSection';

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
        <CflTableBody key={`${keyIdx}`}>
          <CflTableCellElement>{className}</CflTableCellElement>
          <CflTableCellElement
            justifyContent="space-between"
            alignItems="center"
          >
            {accessCode}
            <CopyToClipboardIcon accessCode={accessCode} />
          </CflTableCellElement>
          <CflTableCellElement>
            {teacher === `${firstName} ${lastName}` ? 'You' : teacher}
          </CflTableCellElement>
          <CflTableCellElement justifyContent="center">
            <Button color="tertiary" endIcon={<CreateOutlined />}>
              Update details
            </Button>
          </CflTableCellElement>
        </CflTableBody>
      ))}
    </CflTable>
  );
};

const ExternalStudentsJoiningRequestsActions: React.FC = () => {
  return (
    <>
      <Button endIcon={<Add />}>Add to class</Button>
      <Button color="error" endIcon={<DoNotDisturb />}>
        Reject
      </Button>
    </>
  );
};

const ExternalStudentsJoiningRequestsTable: React.FC = (): JSX.Element => {
  const teacherData = getTeachersData();
  return (
    <CflTable titles={['Name', 'Email address', 'Class', 'Actions']}>
      {teacherData.map(
        (
          { teacherName, teacherClass, teacherEmail, isTeacherAdmin },
          keyIdx: number
        ) => (
          <CflTableBody key={`${keyIdx}`}>
            <CflTableCellElement>{teacherName}</CflTableCellElement>
            <CflTableCellElement>{teacherEmail}</CflTableCellElement>
            <CflTableCellElement>{teacherClass}</CflTableCellElement>
            <CflTableCellElement justifyContent="center">
              <ExternalStudentsJoiningRequestsActions />
            </CflTableCellElement>
          </CflTableBody>
        )
      )}
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
      <ExternalStudentsJoiningRequestsTable />
      <Typography fontWeight="bold">
        No student has currently requested to join your classes.
      </Typography>
    </>
  );
};

const CreateNewClassForm: React.FC = (): JSX.Element => {
  return (
    <CflHorizontalForm
      header="Create a new class"
      initialValues={CREATE_CLASS_INITIAL_VALUES}
      validationSchema={CREATE_CLASS_SCHEMA}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
      submitButton={
        <Button type="submit" variant="contained" color="tertiary">
          Create class
        </Button>
      }
    >
      <CflTextField
        name="className"
        placeholder="Class name"
        helperText="Enter a class name"
        size="small"
      />
      <CflTextField
        name="teacherName"
        placeholder="Teacher's name"
        helperText="Enter the teacher's name"
        size="small"
      />

      <Box>{/* Blank component to fill the grid */}</Box>
      <CflCheckboxField
        name="isStudentProgressVisibleToOthers"
        formControlLabelProps={{
          label: "Allow students to see their classmates' progress?"
        }}
      />
    </CflHorizontalForm>
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
  const theme = useTheme();
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your classes" />
      <PageSection>
        <YourClasses />
        <ClassTable />
        <ExternalStudentsJoiningRequests />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
        <CreateNewClass />
      </PageSection>
    </BasePage>
  );
};

export default TeacherClasses;
