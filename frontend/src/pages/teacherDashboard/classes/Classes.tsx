import React from 'react';
import { useParams, useNavigate, generatePath, useLocation } from 'react-router-dom';
import { Button, Typography, useTheme, Link, Stack } from '@mui/material';
import { Add, Create, DoNotDisturb } from '@mui/icons-material';
import * as Yup from 'yup';
import { FieldArray, Form, Formik } from 'formik';

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
import CopyToClipboardIcon from '../../../components/CopyToClipboardIcon';
import { CflHorizontalForm } from '../../../components/form/CflForm';
import ClassNameField from '../../../components/form/ClassNameField';
import SeeClassmatesProgressField from '../../../components/form/SeeClassmatesProgressField';
import EditClass from './editClass/EditClass';
import { classType, teacherType, useLeaveOrganisationMutation } from '../../../app/api/organisation';
import { TeacherDashboardData, moveClassesType, organsationKickType, useOrganisationKickMutation } from '../../../app/api/teacher/dashboard';
import { CreateClassFormType, CreatedClassType, useAcceptStudentRequestMutation, useCreateNewClassMutation, useRejectStudentRequestMutation } from '../../../app/api/teacher/dashboardClasses';

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

const ClassTable: React.FC<{
  teacherData: TeacherDashboardData['teacher'];
  classData: TeacherDashboardData['classes'];
}> = ({ teacherData, classData }) => {
  const navigate = useNavigate();
  const [firstName, lastName] = [teacherData.teacherFirstName, teacherData.teacherLastName];
  const isAdmin = teacherData.isAdmin;

  return (
    <CflTable titles={isAdmin ? ['Class name', 'Access code', 'Teacher', 'Action'] : ['Class name', 'Access code', 'Action']}>
      {classData.map(({ name, accessCode, classTeacherFirstName, classTeacherLastName }) => (
        <CflTableBody key={`${accessCode}`}>
          <CflTableCellElement>{name}</CflTableCellElement>
          <CflTableCellElement
            justifyContent="space-between"
            alignItems="center"
          >
            {accessCode}
            <CopyToClipboardIcon stringToCopy={accessCode} />
          </CflTableCellElement>
          {isAdmin && <CflTableCellElement>
            {`${classTeacherFirstName} ${classTeacherLastName}` === `${firstName} ${lastName}` ? 'You' : `${classTeacherFirstName} ${classTeacherLastName}`}
          </CflTableCellElement>
          }
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

const ExternalStudentsJoiningRequestsTable: React.FC<{
  requestData: TeacherDashboardData['requests'];
}> = ({ requestData }) => {
  const navigate = useNavigate();
  const [acceptStudentRequest] = useAcceptStudentRequestMutation();
  const [rejectStudentRequest] = useRejectStudentRequestMutation();

  const onAcceptRequest = (id: number): void => {
    acceptStudentRequest({ id }).unwrap()
      .then(() => { console.log('acceptStudentRequest'); })
      .catch((err) => { console.error('AcceptStudentRequest error', err); });
  };

  const onRejectRequest = (id: number): void => {
    rejectStudentRequest({ id }).unwrap()
      .then(() => {
        navigate('.', {
          state: {
            message: 'Request from external/independent student has been rejected successfully.'
          }
        });
      })
      .catch((err) => { console.error('RejectStudentRequest error', err); });
  };

  return (
    <CflTable
      className="body"
      titles={['Name', 'Email address', 'Class', 'Actions']}
    >
      {requestData.map(
        (
          { studentId, studentFirstName, studentEmail, requestClass, isRequestTeacher, requestTeacherFirstName, requestTeacherLastName },
          keyIdx: number
        ) => (
          <CflTableBody key={`${keyIdx}`}>
            <CflTableCellElement>{studentFirstName}</CflTableCellElement>
            <CflTableCellElement>{studentEmail}</CflTableCellElement>
            <CflTableCellElement>
              {requestClass}
              {isRequestTeacher ? '' : ` (${requestTeacherFirstName} ${requestTeacherLastName})`}
            </CflTableCellElement>
            <CflTableCellElement justifyContent="center">
              <Button endIcon={<Add />} onClick={() => { onAcceptRequest(studentId); }}>Add to class</Button>
              <Button className="alert" endIcon={<DoNotDisturb />} onClick={() => { onRejectRequest(studentId); }}>
                Reject
              </Button>
            </CflTableCellElement>
          </CflTableBody>
        )
      )}
    </CflTable>
  );
};

const ExternalStudentsJoiningRequests: React.FC<{
  requestData: TeacherDashboardData['requests'];
}> = ({ requestData }) => {
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
      {requestData.length
        ? <ExternalStudentsJoiningRequestsTable requestData={requestData} />
        : <Typography fontWeight="bold" mb={0}>
          No student has currently requested to join your classes.
        </Typography>
      }
    </>
  );
};

const CREATE_CLASS_SCHEMA = Yup.object().shape({
  class: Yup.string().required('Required'),
  teacherName: Yup.string().required('Required'),
  seeClassmates: Yup.boolean()
});

const CreateNewClassForm: React.FC<{
  teacherData: TeacherDashboardData['teacher'];
  coworkersData: TeacherDashboardData['coworkers'];
}> = ({ teacherData, coworkersData }) => {
  const isAdmin = teacherData.isAdmin;
  const teacherNames = isAdmin
    ? coworkersData.map((teacher) => `${teacher.teacherFirstName} ${teacher.teacherLastName}`)
    : [`${teacherData.teacherFirstName} ${teacherData.teacherLastName}`];
  const subheader = isAdmin
    ? ' When you set up a new class, a unique class access code will automatically be generated for the teacher assigned to the class.'
    : 'When you set up a new class, a unique class access code will automatically be generated, with you being identified as the teacher for that class.';

  const navigate = useNavigate();
  const [createNewClass] = useCreateNewClassMutation();
  const onCreateNewClass = (values: CreateClassFormType): void => {
    values.teacherId = coworkersData.filter((teacher) => values.teacherName === `${teacher.teacherFirstName} ${teacher.teacherLastName}`)[0].id;
    createNewClass(values).unwrap()
      .then((res: CreatedClassType) => {
        navigate(
          generatePath(paths.teacher.dashboard.classes.editClass._, {
            accessCode: res.accessCode
          }), {
          state: {
            message: `The class ${res.name} has been created successfully.`
          }
        });
      })
      .catch((err) => { console.error('CreateNewClass error: ', err); });
  };

  return (
    <CflHorizontalForm
      header="Create a new class"
      subheader={subheader}
      initialValues={{
        class: '',
        teacherName: teacherNames[0],
        seeClassmates: false
      }}
      validationSchema={CREATE_CLASS_SCHEMA}
      onSubmit={(values) => { onCreateNewClass(values); }}
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
        disabled={!isAdmin}
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

  const onLeaveOrganisation = (info: moveClassesType[]): void => {
    leaveOrganisation(info).unwrap()
      .then(() => {
        navigate(paths.teacher.onboarding._, { state: { leftOrganisation: true } });
      })
      .catch((err) => { console.error('LeaveOrganisation error: ', err); });
  };

  const onOrganisationKick = (info: organsationKickType): void => {
    info.id = teacherId;
    organisationKick(info).unwrap()
      .then(() => {
        navigate(paths.teacher.dashboard.school._, {
          state: {
            message: 'The teacher has been successfully removed from your school or club, and their classes were successfully transferred.'
          }
        });
        navigate(0);
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
    const selectedTeacher = teacherList.find((t: teacherListType) => (t.fullName === name));
    return selectedTeacher ? (selectedTeacher.id) : -1;
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
                    {classes.map((c: classType, index: number) =>
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

export const MoveClasses: React.FC = () => {
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
  data: TeacherDashboardData;
}> = ({ data }) => {
  const theme = useTheme();
  const params = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema })
  );
  const location = useLocation();

  if (params?.accessCode !== undefined) {
    return <EditClass accessCode={params.accessCode} />;
  }

  return (
    <>
      {location.state?.message &&
        <Page.Notification>
          {location.state.message}
        </Page.Notification>
      }
      <Page.Section>
        <_YourClasses />
        <ClassTable teacherData={data.teacher} classData={data.classes} />
      </Page.Section >
      <Page.Section>
        <ExternalStudentsJoiningRequests requestData={data.requests} />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <CreateNewClassForm teacherData={data.teacher} coworkersData={data.coworkers} />
      </Page.Section>
    </>
  );
};

export default Classes;
