import * as Yup from 'yup';
import React from 'react';
import {
  useTheme,
  Typography,
  Grid,
  Stack,
  Button,
  Link,
  Box
} from '@mui/material';
import { Formik, Form } from 'formik';
import {
  AutocompleteField,
  CheckboxField
} from 'codeforlife/lib/esm/components/form';
import {
  BLOCKLY_LEVELS,
  PYTHON_LEVELS,
  RapidRouterGameTabs
} from './rapidRouterLevelsProps';
import RapidRouterTabTitles from './RapidRouterTabTitles';
import RapidRouterTabs from './RapidRouterTabs';
import ClassNameField from '../../../../../components/form/ClassNameField';
import Page from 'codeforlife/lib/esm/components/page';

const currentDropdownOptions = [
  "Don't change my current setting",
  "Don't allow external requests to this class",
  'Allow external requests to this class for the next hour',
  'Allow external requests to this class for the next 4 hours',
  'Allow external requests to this class for the next 8 hours',
  'Allow external requests to this class for the next 12 hours',
  'Allow external requests to this class for the next 16 hours',
  'Allow external requests to this class for the next 20 hours',
  'Allow external requests to this class for the next 24 hours',
  'Allow external requests to this class for the next 2 days',
  'Allow external requests to this class for the next 3 days',
  'Allow external requests to this class for the next 4 days',
  'Always allow external requests to this class (not recommended)'
];

const ClassDetailsForm: React.FC<{
  goBack: () => void;
}> = ({ goBack }) => {
  const theme = useTheme();
  return (
    <Formik
      initialValues={{
        // TODO: Prepopulate by getting class data instead of hardcoding
        class: 'Class 1',
        classSettingOptions: currentDropdownOptions[0],
        allowStudentsToSeeEachOthersProgress: false
      }}
      validationSchema={Yup.object().shape({
        class: Yup.string().required('Required'),
        classSettingOptions: Yup.string().required('Required'),
        allowStudentsToSeeEachOthersProgress: Yup.boolean().required('Required')
      })}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ClassNameField />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CheckboxField
                name="allowStudentsToSeeEachOthersProgress"
                formControlLabelProps={{
                  label: "Allow students to see their classmates' progress."
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack gap={1}>
                <Typography marginTop={theme.spacing(5)} variant="h5">
                  External requests setting
                </Typography>
                <Typography>
                  You can set up permissions for this class allowing students to
                  send requests asking to join your class from outside of your
                  school or club.
                </Typography>
                <Typography marginTop={theme.spacing(1)} fontWeight="bold">
                  This class is not current accepting external requests.
                </Typography>
                <Typography marginTop={theme.spacing(2)}>
                  Set up external requests to this class
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <AutocompleteField
                      options={currentDropdownOptions}
                      textFieldProps={{
                        required: true,
                        name: 'classSettingOptions',
                        helperText: 'Choose your setting'
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
                <Stack
                  gap={3}
                  direction="row"
                  justifyContent="flex-start"
                  marginTop={theme.spacing(3)}
                >
                  <Button variant="outlined" onClick={goBack}>
                    Cancel
                  </Button>
                  <Button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
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

const TransferClassToAnotherTeacher: React.FC = () => {
  const options = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
  const theme = useTheme();
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
          alert(JSON.stringify(values, null, 2));
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

  return (
    <>
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
      <Page.Section
        sx={{
          my: theme.spacing(2)
        }}
        gridProps={{ bgcolor: theme.palette.info.main }}
      >
        <Typography marginTop={theme.spacing(4)} variant="h5">
          Class details
        </Typography>
        <ClassDetailsForm goBack={goBack} />
      </Page.Section>
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
        <TransferClassToAnotherTeacher />
      </Page.Section>
    </>
  );
};

export default AdditionalSettings;
