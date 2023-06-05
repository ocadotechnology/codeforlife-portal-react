import React from 'react';
import PageSection from '../../components/PageSection';
import BasePage from '../BasePage';
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import BackToLinkTextButton from '../../components/BackToLinkTextButton';
import { paths } from '../../app/router';
import {
  useTheme,
  Typography,
  InputAdornment,
  Grid,
  Stack,
  Button
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { CheckboxField, TextField } from 'codeforlife/lib/esm/components/form';
import { People } from '@mui/icons-material';
import {
  BLOCKLY_LEVELS,
  PYTHON_LEVELS,
  RapidRouterGameTabs
} from './rapidRouterLevelsProps';
import { DropDownField, currentDropdownOptions } from './CurrentDropDown';
import RapidRouterTabTitles from './RapidRouterTabTitles';
import RapidRouterTabs from './RapidRouterTabs';
import { validateAccessCode } from '../login/StudentForm';

const ClassDetailsForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        className: '',
        classSettingOptions: '',
        allowStudnetsToSeeEachOthersProgress: false
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="className"
                placeholder="Enter class name"
                helperText="Enter class name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <People />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CheckboxField
                name="allowStudnetsToSeeEachOthersProgress"
                formControlLabelProps={{
                  label: "Allow students to see their classmates' progress."
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack gap={1}>
                <Typography variant="h5">External requests setting</Typography>
                <Typography variant="body2">
                  You can set up permissions for this class allowing students to
                  send requests asking to join your class from outside of your
                  school or club.
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  This class is not current accepting external requests.
                </Typography>
                <Typography variant="subtitle1">
                  Set up external requests to this class
                </Typography>
                <Field
                  as={DropDownField}
                  name="classSettingsOptions"
                  options={currentDropdownOptions}
                  formikProps={formik}
                  helperText="Choose your setting"
                />
                <Stack gap={3} direction="row" justifyContent="flex-start">
                  <Button variant="outlined" color="tertiary">
                    Cancel
                  </Button>
                  <Button variant="contained" color="tertiary" type="submit">
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
              name={RapidRouterGameTabs.gettingStarted.name}
              levels={RapidRouterGameTabs.gettingStarted.levels}
              color={RapidRouterGameTabs.gettingStarted.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.shortestRoute.name}
              levels={RapidRouterGameTabs.shortestRoute.levels}
              color={RapidRouterGameTabs.shortestRoute.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.loopsAndRepetitions.name}
              levels={RapidRouterGameTabs.loopsAndRepetitions.levels}
              color={RapidRouterGameTabs.loopsAndRepetitions.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.loopsAndConditions.name}
              levels={RapidRouterGameTabs.loopsAndConditions.levels}
              color={RapidRouterGameTabs.loopsAndConditions.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.ifOnly.name}
              levels={RapidRouterGameTabs.ifOnly.levels}
              color={RapidRouterGameTabs.ifOnly.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.trafficLights.name}
              levels={RapidRouterGameTabs.trafficLights.levels}
              color={RapidRouterGameTabs.trafficLights.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.limitedBlocks.name}
              levels={RapidRouterGameTabs.limitedBlocks.levels}
              color={RapidRouterGameTabs.limitedBlocks.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.procedures.name}
              levels={RapidRouterGameTabs.procedures.levels}
              color={RapidRouterGameTabs.procedures.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.blocklyBrainTeasers.name}
              levels={RapidRouterGameTabs.blocklyBrainTeasers.levels}
              color={RapidRouterGameTabs.blocklyBrainTeasers.color}
              formik={formik}
            />
            <RapidRouterTabTitles
              title="Python levels"
              levels={PYTHON_LEVELS}
              formikProps={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.introdutionToPython.name}
              levels={RapidRouterGameTabs.introdutionToPython.levels}
              color={RapidRouterGameTabs.introdutionToPython.color}
              formik={formik}
            />
            <RapidRouterTabs
              name={RapidRouterGameTabs.python.name}
              levels={RapidRouterGameTabs.python.levels}
              color={RapidRouterGameTabs.python.color}
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
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
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
                <Field
                  as={DropDownField}
                  name="transferClassToAnotherTeacher"
                  formikProps={formik}
                  options={options}
                  helperText="Choose a teacher"
                />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
            <Stack direction="row" columnGap={3}>
              <Button variant="contained" color="tertiary" type="submit">
                Transfer class
              </Button>
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
      validate: SearchParams.validate.matchesSchema(validateAccessCode),
      cast: SearchParams.cast.toString
    }
  });
  const accessCode = params?.accessCode ?? '';

  const theme = useTheme();
  return (
    <BasePage>
      <PageSection>
        <Typography variant="h4">
          Additional class settings class {'<CLASS NAME>'} ({accessCode}
          ))
        </Typography>
        <BackToLinkTextButton
          href={`${paths.teacherClass._}?accessCode=${accessCode}`}
          text="Back to Edit Class"
        />
        <Typography variant="body2">
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
        <RapidRouterAccessSettings />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.light}>
        <TransferClassToAnotherTeacher />
      </PageSection>
    </BasePage>
  );
};

export default AdditionalClassSettings;
