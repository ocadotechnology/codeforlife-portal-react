import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';

import {
  AutocompleteField
} from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';

import RapidRouterTabTitles from './RapidRouterTabTitles';
import RapidRouterTabs from './RapidRouterTabs';
import UpdateClassForm from './UpdateClassForm';
import {
  BLOCKLY_LEVELS,
  PYTHON_LEVELS,
  RapidRouterGameTabs
} from './rapidRouterLevelsProps';
import { useGetClassQuery, useGetTeacherDataQuery, useMoveClassMutation } from '../../../../../app/api';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../../app/router';

const allLevelsChecked: string[] = Array.from({ length: 109 }, (_, i) =>
  (i + 1).toString()
);

const RapidRouterAccessSettings: React.FC = () => {
  const theme = useTheme();
  return (
    <Formik
      initialValues={{
        levelsSubmitted: allLevelsChecked
      }}
      onSubmit={(values) => {
        values.levelsSubmitted = values.levelsSubmitted.filter(
          (level: string) => level !== ''
        );

        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <Stack gap={0.75}>
            <RapidRouterTabTitles
              title="Blockly levels"
              levels={BLOCKLY_LEVELS}
              formikProps={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.gettingStarted}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.shortestRoute}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.loopsAndRepetitions}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.loopsAndConditions}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.ifOnly}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.trafficLights}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.limitedBlocks}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.procedures}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.blocklyBrainTeasers}
              formik={formik}
            />
            <RapidRouterTabTitles
              title="Python levels"
              levels={PYTHON_LEVELS}
              formikProps={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.introdutionToPython}
              formik={formik}
            />
            <RapidRouterTabs
              episode={RapidRouterGameTabs.python}
              formik={formik}
            />
            <Button type="submit" sx={{ marginTop: theme.spacing(3) }}>
              Save level settings
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const TransferClassToAnotherTeacher: React.FC<{
  accessCode: string;
}> = ({ accessCode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { teacher, coworkers } = useGetTeacherDataQuery(undefined, {
    selectFromResult: ({ data }) => ({
      teacher: data?.teacher,
      coworkers: data?.coworkers
    })
  });
  const options = (coworkers && teacher)
    ? coworkers.filter((worker) => worker.teacherEmail !== teacher.teacherEmail)
      .map((worker) => `${worker.teacherFirstName} ${worker.teacherLastName}`)
    : [];
  const [moveClass] = useMoveClassMutation();

  return (
    <Box
      sx={{
        marginTop: theme.spacing(3)
      }}
    >
      <Formik
        initialValues={{
          transferClassToAnotherTeacher: options[0]
        }}
        onSubmit={(values) => {
          const teacherId = coworkers?.find((worker) => `${worker.teacherFirstName} ${worker.teacherLastName}` === values.transferClassToAnotherTeacher)?.id as string;
          moveClass({ accessCode, teacherId }).unwrap()
            .then(() => {
              navigate(paths.teacher.dashboard.classes._, {
                state: {
                  message: 'The class has been successfully assigned to a different teacher.'
                }
              });
            })
            .catch((err) => { console.error('MoveClass error: ', err); });
        }}
      >
        {(formik) => (
          <Form>
            <Stack>
              <Typography marginBottom={theme.spacing(2.5)} variant="h5">
                Transfer class to another teacher
              </Typography>
              <Typography>
                Select a new teacher from your school or club to take over the
                above class from the list below.
              </Typography>
              <Typography
                color="error"
                fontWeight="bold"
                marginBottom={theme.spacing(5)}
              >
                Warning: The class will move immediately to the new teacher.
                Should you wish to undo this action, please contact that
                teacher.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">
                    New teacher to take over class
                  </Typography>
                  <AutocompleteField
                    options={options}
                    textFieldProps={{
                      required: true,
                      name: 'transferClassToAnotherTeacher',
                      helperText: 'Select teacher',
                      placeholder: options[0]
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
              <Stack
                direction="row"
                columnGap={3}
                marginTop={theme.spacing(3)}
                marginBottom={theme.spacing(2)}
              >
                <Button type="submit">Transfer class</Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const AdditionalSettings: React.FC<{
  accessCode: string;
  goBack: () => void;
}> = ({ accessCode, goBack }) => {
  const theme = useTheme();
  const { data } = useGetClassQuery({ accessCode });

  return <>
    <Page.Section>
      <Typography variant="h4" align="center">
        Additional class settings class Class 1 ({accessCode})
      </Typography>
      <Link className="back-to" onClick={goBack}>
        Edit Class
      </Link>
      <Typography mb={0}>
        You may change the name of the class, or change permissions to allow
        external requests from independent students to join this class. You
        may also transfer the class to another teacher, or change permissions
        to allow pupils to see their classmates&apos; progress.
      </Typography>
    </Page.Section>
    {data !== undefined &&
      <Page.Section
        sx={{
          my: theme.spacing(2)
        }}
        gridProps={{ bgcolor: theme.palette.info.main }}
      >
        <Typography marginTop={theme.spacing(4)} variant="h5">
          Class details
        </Typography>
        <UpdateClassForm
          accessCode={accessCode}
          name={data.class.name}
          classmateProgress={data.class.classmateProgress}
          externalRequestsMessage={data.externalRequestsMessage}
        />
      </Page.Section>
    }
    <Page.Section
      sx={{
        marginTop: theme.spacing(3.5),
        marginBottom: theme.spacing(6)
      }}
    >
      <Typography variant="h5">Rapid Router access settings</Typography>
      <Typography marginBottom={theme.spacing(3.5)}>
        You may control access to levels here by selecting what you wish to
        display to the students.
      </Typography>
      <RapidRouterAccessSettings />
    </Page.Section>
    <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
      <TransferClassToAnotherTeacher accessCode={accessCode} />
    </Page.Section>
  </>;
};

export default AdditionalSettings;
