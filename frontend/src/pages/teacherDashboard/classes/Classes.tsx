import React from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import { Button, Typography, useTheme, Link, Select, MenuItem } from '@mui/material';
import { Add, Create, DoNotDisturb } from '@mui/icons-material';
import * as Yup from 'yup';

import {
  AutocompleteField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
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
import { useLeaveOrganisationMutation } from '../../../app/api/endpoints/organisation';

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
            <CopyToClipboardIcon stringToCopy={accessCode} />
          </CflTableCellElement>
          <CflTableCellElement>
            {teacher === `${firstName} ${lastName}` ? 'You' : teacher}
          </CflTableCellElement>
          <CflTableCellElement justifyContent="center">
            <Button
              onClick={() => {
                navigate(
                  generatePath(paths.teacher.dashboard.classes.editClass._, {
                    accessCode
                  })
                );
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
      <Button className="alert" endIcon={<DoNotDisturb />}>
        Reject
      </Button>
    </>
  );
};

const ExternalStudentsJoiningRequestsTable: React.FC = () => {
  const teacherData = getTeachersData();
  return (
    <CflTable
      className="body"
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

const MoveClassTeacherForm: React.FC = () => {
  // TODO: get data from BE and rewrite this to a form
  const classesData = getClassesData();
  const theme = useTheme();
  const [leaveOrganisation] = useLeaveOrganisationMutation();
  const navigate = useNavigate();

  const onLeaveOrganisation = (): void => {
    // TODO: call API to handover classes to new teachers
    leaveOrganisation().unwrap()
      .then(() => { navigate(paths.teacher.onboarding._, { state: { leftOrganisation: true } }); })
      .catch((err) => { console.log('LeaveOrganisation error: ', err); });
  };

  return (
    <>
      <Typography marginY={theme.spacing(3)}>
        Please specify which teacher you would like the classes below to be moved to.
      </Typography>
      <CflTable
        className='body'
        titles={['Class name', 'New teacher']}
      >
        {classesData.map(
          ({ className }, keyIdx: number) => (
            <CflTableBody key={`${keyIdx}`}>
              <CflTableCellElement>
                <Typography variant="subtitle1">
                  {className}
                </Typography>
              </CflTableCellElement>
              <CflTableCellElement
                direction="column"
                alignItems="flex-start"
              >
                <Select defaultValue={1}>
                  <MenuItem value={1}> New Teacher 1 </MenuItem>
                  <MenuItem value={2}> New Teacher 2 </MenuItem>
                </Select>
              </CflTableCellElement>
            </CflTableBody>
          ))}
      </CflTable>
      <Button variant='outlined'>
        Cancel
      </Button>
      <Button
        onClick={onLeaveOrganisation}
        sx={{ marginLeft: theme.spacing(3) }}
      >
        Move classes and leave
      </Button>
    </>
  );
};

const MoveClasses: React.FC = () => {
  // TODO: get data from BE
  const userName = 'John Doe';
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Page.Notification>
        You still have classes, you must first move them to another teacher within your school or club.
      </Page.Notification>
      <Page.Section>
        <Typography variant="h4" align="center" marginBottom={theme.spacing(5)}>
          Move all classes for teacher {userName}
        </Typography>
        <Link className="back-to" onClick={() => {
          navigate(paths.teacher.dashboard.school._);
        }}>
          dashboard
        </Link>
        <MoveClassTeacherForm />
      </Page.Section >
    </>
  );
};

const Classes: React.FC<{
  movingClass: boolean;
}> = ({ movingClass }) => {
  const theme = useTheme();
  const params = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema })
  );

  if (params?.accessCode !== undefined) {
    return <EditClass accessCode={params.accessCode} />;
  }

  return (
    <>
      {movingClass
        ? <MoveClasses />
        : <>
          <Page.Section>
            <_YourClasses />
            <ClassTable />
          </Page.Section >
          <Page.Section>
            <ExternalStudentsJoiningRequests />
          </Page.Section>
          <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
            <CreateNewClassForm />
          </Page.Section>
        </>
      }
    </>
  );
};

export default Classes;
