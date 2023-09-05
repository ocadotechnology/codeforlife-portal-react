import React from 'react';
import { useParams, useNavigate, generatePath, useLocation } from 'react-router-dom';
import { Button, Typography, useTheme, Link, Stack } from '@mui/material';
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
import { classType, teacherType, useLeaveOrganisationMutation } from '../../../app/api/organisation';
import { FieldArray, Form, Formik } from 'formik';
import { useOrganisationKickMutation } from '../../../app/api/teacher/dashboard';

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

const MoveClassTeacherForm: React.FC<{
  source: string;
  classes: classType[];
  teachers: teacherType[];
  teacherId: string;
}> = ({ source, classes, teachers, teacherId }) => {
  interface classFormDataType extends classType {
    newTeacher: string
  };

  interface teacherListType {
    id: number,
    fullName: string
  };

  const theme = useTheme();
  const [leaveOrganisation] = useLeaveOrganisationMutation();
  const [organisationKick] = useOrganisationKickMutation();
  const navigate = useNavigate();

  const onLeaveOrganisation = (info: any): void => {
    leaveOrganisation(info).unwrap()
      .then(() => {
        navigate(paths.teacher.onboarding._, { state: { leftOrganisation: true } });
      })
      .catch((err) => { console.error('LeaveOrganisation error: ', err); });
  };

  const onOrganisationKick = (info: any): void => {
    info.id = teacherId;
    organisationKick(info).unwrap()
      .then(() => {
        // The teacher has been successfully removed from your school or club, and their classes were successfully transferred.")
        navigate(paths.teacher.dashboard.school._);
      })
      .catch((err) => { console.error('OrganisationKick error: ', err); });
  };

  // TODO: clean this up
  // initialValues: form value
  // teacherList: for finding newTeacher ID (by findNewTeacherId)
  // teacherOptions: showing form options
  // Data type passed to backend would be {accessCode: newTeacherId} (e.g. {'ab124': '3', 'ab125': '4'})
  const initialValues = classes.map((c: classType) => ({ ...c, newTeacher: '' }));
  const teacherList = teachers.map((t: teacherType) => ({
    id: t.id,
    fullName: `${t.newUserIdFirstName} ${t.newUserIdLastName}`
  }));
  const teacherOptions = teacherList.map((t: teacherListType) => t.fullName);
  const findNewTeacherId = (name: string): number => {
    const t = teacherList.find((t: teacherListType) => (t.fullName === name));
    return t ? (t.id) : -1;
  };

  return (
    <>
      <Typography marginY={theme.spacing(3)}>
        Please specify which teacher you would like the classes below to be moved to.
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          const info = Object.create(null);
          values.forEach((v: classFormDataType) => {
            info[v.accessCode.toLowerCase()] = findNewTeacherId(v.newTeacher);
          });
          (source === 'organisationLeave') ? onLeaveOrganisation(info) : onOrganisationKick(info);
        }}
      >
        {() => (
          <Form>
            <FieldArray
              name="classes"
              render={() => (
                <>
                  <CflTable
                    className='body'
                    titles={['Class name', 'New teacher']}
                  >
                    {classes.map((c: any, index: number) =>
                      <CflTableBody key={c.id}>
                        <CflTableCellElement>
                          <Typography variant="subtitle1">
                            {c.name}
                          </Typography>
                        </CflTableCellElement>
                        <CflTableCellElement
                          direction="column"
                          alignItems="flex-start"
                        >
                          <AutocompleteField
                            options={teacherOptions}
                            textFieldProps={{
                              required: true,
                              name: `${index}.newTeacher`
                            }}
                            freeSolo={true}
                            forcePopupIcon={true}
                            sx={{ width: 200 }}
                          />
                        </CflTableCellElement>
                      </CflTableBody>
                    )}
                  </CflTable >
                  <Stack direction="row" spacing={2}>
                    <Button variant='outlined' onClick={() => {
                      navigate(paths.teacher.dashboard.school._);
                    }}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                    >
                      {source === 'organisationKick' ? 'Move classes and remove teacher' : 'Move classes and leave'}
                    </Button>
                  </Stack>
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

const MoveClasses: React.FC = () => {
  // TODO: get data from BE
  const userName = 'John Doe';
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      <Page.Notification>
        {location.state.source === 'organisationKick'
          ? 'This teacher still has classes assigned to them. You must first move them to another teacher in your school or club.'
          : 'You still have classes, you must first move them to another teacher within your school or club.'
        }
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
        <MoveClassTeacherForm
          source={location.state.source}
          classes={location.state.classes}
          teachers={location.state.teachers}
          teacherId={location.state.teacherId}
        />
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
