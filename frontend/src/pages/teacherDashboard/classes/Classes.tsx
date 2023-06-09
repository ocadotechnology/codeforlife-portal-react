import React from 'react';
import {
  useParams,
  useNavigate,
  generatePath
} from 'react-router-dom';
import { Button, Typography, useTheme } from '@mui/material';
import { Add, Create, DoNotDisturb } from '@mui/icons-material';
import * as Yup from 'yup';

import { AutocompleteField, SubmitButton } from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import CflTable, {
  CflTableBody,
  CflTableCellElement
} from '../../../components/CflTable';
import { accessCodeSchema } from '../../../app/schemas';
import { paths } from '../../../app/router';
import { getClassesData, getTeachersData, getUser } from '../dummyMethods';
import CopyToClipboardIcon from '../../../components/CopyToClipboardIcon';
import { CflHorizontalForm } from '../../../components/form/CflForm';
import ClassNameField from '../../../components/form/ClassNameField';
import SeeClassmatesProgressField from '../../../components/form/SeeClassmatesProgressField';
import EditClass from './editClass/EditClass';

const _YourClasses: React.FC = () => {
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

const ClassTable: React.FC = () => {
  const navigate = useNavigate();
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
              onClick={() => {
                navigate(generatePath(
                  paths.teacher.dashboard.classes.editClass._,
                  { accessCode }
                ));
              }}
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
      <Button
        className="alert"
        endIcon={<DoNotDisturb />}
      >
        Reject
      </Button>
    </>
  );
};

const ExternalStudentsJoiningRequestsTable: React.FC = () => {
  const teacherData = getTeachersData();
  return (
    <CflTable
      className='body'
      titles={['Name', 'Email address', 'Class', 'Actions']}
    >
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

const ExternalStudentsJoiningRequests: React.FC = () => {
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
      <Typography fontWeight="bold" mb={0}>
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

const CreateNewClassForm: React.FC = () => {
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
      submitButton={<SubmitButton>Create class</SubmitButton>}
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
      <>{/* NOTE: Leaving an empty gap */}</>
      <SeeClassmatesProgressField />
    </CflHorizontalForm>
  );
};

const Classes: React.FC = () => {
  const theme = useTheme();

  const params = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema })
  );

  if (params?.accessCode !== undefined) {
    return <EditClass
      accessCode={params.accessCode}
    />;
  }

  return <>
    <Page.Section>
      <_YourClasses />
      <ClassTable />
    </Page.Section>
    <Page.Section>
      <ExternalStudentsJoiningRequests />
    </Page.Section>
    <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
      <CreateNewClassForm />
    </Page.Section>
  </>;
};

export default Classes;
