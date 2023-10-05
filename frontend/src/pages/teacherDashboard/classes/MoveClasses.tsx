import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, useTheme, Link, Stack } from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';

import {
  AutocompleteField
} from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';

import CflTable, {
  CflTableBody,
  CflTableCellElement
} from '../../../components/CflTable';
import { paths } from '../../../app/router';
import { useLeaveOrganisationMutation } from '../../../app/api/organisation';
import { MoveClassDataProps, MoveClassesFormProps, OrgansationKickProps, useOrganisationKickMutation } from '../../../app/api/teacher/dashboard';

const MoveClassTeacherForm: React.FC<{
  source: string;
  classes: MoveClassDataProps['classes'];
  coworkers: MoveClassDataProps['coworkers'];
  teacherId: string;
}> = ({ source, classes, coworkers, teacherId }) => {
  const theme = useTheme();
  const [leaveOrganisation] = useLeaveOrganisationMutation();
  const [organisationKick] = useOrganisationKickMutation();
  const navigate = useNavigate();

  const onLeaveOrganisation = (moveClassFormData: MoveClassesFormProps): void => {
    leaveOrganisation(moveClassFormData).unwrap()
      .then(() => {
        navigate(paths.teacher.onboarding._, { state: { leftOrganisation: true } });
      })
      .catch((err) => { console.error('LeaveOrganisation error: ', err); });
  };

  const onOrganisationKick = (moveClassFormData: MoveClassesFormProps): void => {
    const organisationKickData: OrgansationKickProps = { ...moveClassFormData, id: teacherId };
    organisationKick(organisationKickData).unwrap()
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

  const findNewTeacherId = (name: string): string => {
    const selectedTeacher = coworkers.find((coworker) => (name === `${coworker.teacherFirstName} ${coworker.teacherLastName}`));
    return selectedTeacher ? (selectedTeacher.id) : '-1';
  };

  const coworkerOptions = coworkers.map((coworker) => `${coworker.teacherFirstName} ${coworker.teacherLastName}`);
  const initialValues: MoveClassesFormProps = Object.assign({}, ...classes.map((klass) => ({ [klass.accessCode]: '' })));

  return (
    <>
      <Typography marginY={theme.spacing(3)}>
        Please specify which teacher you would like the classes below to be moved to.
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          const moveClassFormData: MoveClassesFormProps = Object.create(null);
          for (const [key, value] of Object.entries(values)) {
            moveClassFormData[key.toLowerCase()] = findNewTeacherId(value);
          }
          moveClassFormData.id = teacherId;
          (source === 'organisationLeave') ? onLeaveOrganisation(moveClassFormData) : onOrganisationKick(moveClassFormData);
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
                    {classes
                      ? classes.map((klass: any) =>
                        <CflTableBody key={klass.accessCode}>
                          <CflTableCellElement>
                            <Typography variant="subtitle1">
                              {klass.name}
                            </Typography>
                          </CflTableCellElement>
                          <CflTableCellElement
                            direction="column"
                            alignItems="flex-start"
                          >
                            <AutocompleteField
                              options={coworkerOptions}
                              textFieldProps={{
                                required: true,
                                name: klass.accessCode
                              }}
                              freeSolo={true}
                              forcePopupIcon={true}
                              sx={{ width: 200 }}
                            />
                          </CflTableCellElement>
                        </CflTableBody>
                      )
                      : <></>
                    }
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
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const data: MoveClassDataProps = location.state;

  return <>
    {
      data &&
      <>
        <Page.Notification>
          {data.source === 'organisationKick'
            ? 'This teacher still has classes assigned to them. You must first move them to another teacher in your school or club.'
            : 'You still have classes, you must first move them to another teacher within your school or club.'
          }
        </Page.Notification>
        <Page.Section>
          <Typography variant="h4" align="center" marginBottom={theme.spacing(5)}>
            Move all classes for teacher {data.teacher.teacherFirstName} {data.teacher.teacherLastName}
          </Typography>
          <Link className="back-to" onClick={() => {
            navigate(paths.teacher.dashboard.school._);
          }}>
            dashboard
          </Link>
          <MoveClassTeacherForm
            source={data.source}
            classes={data.classes}
            coworkers={data.coworkers}
            teacherId={data.teacher.id}
          />
        </Page.Section >
      </>
    }
  </>;
};

export default MoveClasses;
