import React from 'react';
import BasePage from '../../BasePage';
import DashboardBanner from '../DashboardBanner';
import DashboardHeader from '../DashboardHeader';
import CflTable, {
  CflTableBody,
  CflTableCellElement
} from '../../../components/CflTable';
import { Button, Typography, useTheme } from '@mui/material';
import { Add, Create, DoNotDisturb } from '@mui/icons-material';
import { getClassesData, getTeachersData, getUser } from '../dummyMethods';
import { AutocompleteField } from 'codeforlife/lib/esm/components/form';
import CopyToClipboardIcon from '../../../components/CopyToClipboardIcon';
import PageSection from '../../../components/PageSection';
import { paths } from '../../../app/router';
import { CflHorizontalForm } from '../../../components/form/CflForm';
import * as Yup from 'yup';
import ClassNameField from '../../../components/form/ClassNameField';
import SeeClassmatesProgressField from '../../../components/form/SeeClassmatesProgressField';

const YourClasses: React.FC = (): JSX.Element => {
  return (
    <>
      <Typography align="center" variant="h4">
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
            <Button
              href={`${paths.teacher.dashboard.class._}?accessCode=${accessCode}`}
              endIcon={<Create />}
            >
              Edit details
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
      <Typography align="center" variant="h4">
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

const CREATE_CLASS_SCHEMA = Yup.object().shape({
  class: Yup.string().required('Required'),
  teacherName: Yup.string().required('Required'),
  seeClassmates: Yup.boolean()
});

const CreateNewClassForm: React.FC = (): JSX.Element => {
  const teachersData = getTeachersData();
  const teacherNames = teachersData.map((teacher) => teacher.teacherName);
  return (
    <CflHorizontalForm
      header="Create a new class"
      subheader="When you set up a new class, a unique class access code will automatically be generated for the teacher assigned to the class."
      initialValues={{
        class: '',
        teacherName: teacherNames[0],
        seeClassmates: false
      }}
      validationSchema={CREATE_CLASS_SCHEMA}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
      submitButton={<Button type="submit">Create class</Button>}
    >
      <ClassNameField />
      <AutocompleteField
        options={teacherNames}
        textFieldProps={{
          required: true,
          name: 'teacherName',
          helperText: 'Select teacher'
        }}
      />
      <>{/* Leaving an empty gap */}</>
      <SeeClassmatesProgressField />
    </CflHorizontalForm>
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
        <CreateNewClassForm />
      </PageSection>
    </BasePage>
  );
};

export default TeacherClasses;
