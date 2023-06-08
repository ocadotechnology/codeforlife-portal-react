import * as Yup from 'yup';
import React from 'react';
import BasePage from '../../../../BasePage';
import PageSection from '../../../../../components/PageSection';
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import BackToLinkTextButton from '../../../../../components/BackToLinkTextButton';
import { paths } from '../../../../../app/router';
import {
  useTheme,
  Typography,
  InputAdornment,
  Grid,
  Stack,
  Button
} from '@mui/material';
import { Formik, Form } from 'formik';
import {
  AutocompleteField,
  CheckboxField,
  TextField
} from 'codeforlife/lib/esm/components/form';
import { People } from '@mui/icons-material';
import {
  BLOCKLY_LEVELS,
  PYTHON_LEVELS,
  RapidRouterGameTabs
} from './rapidRouterLevelsProps';
import RapidRouterTabTitles from './RapidRouterTabTitles';
import RapidRouterTabs from './RapidRouterTabs';
import { validateAccessCode } from '../../../../login/StudentForm';
import DashboardHeader from '../../../DashboardHeader';
import DashboardBanner from '../../../DashboardBanner';
import ClassNameField from '../../../../../components/form/ClassNameField';
import { allowedNodeEnvironmentFlags } from 'process';

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

const ClassDetailsForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        class: '',
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
                <Typography variant="h5">External requests setting</Typography>
                <Typography>
                  You can set up permissions for this class allowing students to
                  send requests asking to join your class from outside of your
                  school or club.
                </Typography>
                <Typography fontWeight="bold">
                  This class is not current accepting external requests.
                </Typography>
                <Typography>Set up external requests to this class</Typography>
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
                <Stack gap={3} direction="row" justifyContent="flex-start">
                  <Button variant="outlined">Cancel</Button>
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

const RapidRouterAccessSettings: React.FC = () => {
  return (
    <Formik
      initialValues={{
        levelsSubmitted: Array(109).fill('')
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
          <Stack gap={2}>
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
            <Button type="submit">Save level settings</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const TransferClassToAnotherTeacher: React.FC = () => {
  const options = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
  return (
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
            <Typography variant="h5">
              Transfer class to another teacher
            </Typography>
            <Typography>
              Select a new teacher from your school or club to take over the
              above class from the list below.
            </Typography>
            <Typography color="error" fontWeight="bold">
              Warning: The class will move immediately to the new teacher.
              Should you wish to undo this action, please contact that teacher.
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
            <Stack direction="row" columnGap={3}>
              <Button type="submit">Transfer class</Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const AdditionalClassSettings: React.FC = () => {
  const params = SearchParams.get<{ accessCode: string }>({
    accessCode: {
      isRequired: true,
      validate: SearchParams.validate.matchesSchema(validateAccessCode)
    }
  });
  const accessCode = params?.accessCode ?? '';
  const backToEditClassUrl = `${String(
    paths.teacher.dashboard.class._
  )}?accessCode=${accessCode}`;
  const theme = useTheme();
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your classes" />
      <PageSection>
        <Typography variant="h4" align="center">
          Additional class settings class {'<CLASS NAME>'} ({accessCode})
        </Typography>
        <BackToLinkTextButton href={backToEditClassUrl} text="Edit Class" />
        <Typography>
          You may change the name of the class, or change permissions to allow
          external requests from independent students to join this class. You
          may also transfer the class to another teacher, or change permissions
          to allow pupils to see their classmates&apos; progress.
        </Typography>
      </PageSection>
      <PageSection bgcolor={theme.palette.info.light}>
        <Typography variant="h5">Class details</Typography>
        <ClassDetailsForm />
      </PageSection>
      <PageSection>
        <Typography variant="h5">Rapid Router access settings</Typography>
        <Typography>
          You may control access to levels here by selecting what you wish to
          display to the students.
        </Typography>
        <RapidRouterAccessSettings />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.light}>
        <TransferClassToAnotherTeacher />
      </PageSection>
    </BasePage>
  );
};

export default AdditionalClassSettings;
