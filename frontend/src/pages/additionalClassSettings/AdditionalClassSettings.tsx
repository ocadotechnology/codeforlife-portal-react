import React from 'react';
import PageSection from '../../components/PageSection';
import BasePage from '../BasePage';
import { getSearchParams } from 'codeforlife/lib/esm/helpers';
import BackToLinkTextButton from '../../components/BackToLinkTextButton';
import { paths } from '../../app/router';
import {
  useTheme,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  Grid,
  Stack,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Box
} from '@mui/material';
import { Formik, Form, Field, FormikProps } from 'formik';
import { CheckboxField, TextField } from 'codeforlife/lib/esm/components/form';
import { People } from '@mui/icons-material';
import {
  BLOCKLY_LEVELS,
  PYTHON_LEVELS,
  RapidRouterGameTabs
} from './rapidRouterLevelsProps';

const CurrentDropdown: React.FC<any> = ({ onChange }) => {
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

  const [dropdownValue, setDropdownValue] = React.useState<string>(
    currentDropdownOptions[0]
  );

  return (
    <FormControl fullWidth>
      <Select
        size="small"
        labelId="lel"
        id="lelSelect"
        name="classSettingOptions"
        value={dropdownValue}
        onChange={(e) => {
          setDropdownValue(e.target.value);
          onChange(e);
        }}
      >
        {currentDropdownOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Choose your setting</FormHelperText>
    </FormControl>
  );
};

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
      {({ values, handleChange, handleSubmit }) => (
        <Form>
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
                <Field as={CurrentDropdown} />
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

const RapidRouterTabs: React.FC<{
  name: string;
  formik: any;
  color: any;
  levels: Array<{
    level: string;
    name: string;
  }>;
}> = ({ name, levels, color, formik }) => {
  const handleCheckboxChange: (idx: number, e: any) => void = (
    idx: number,
    e: any
  ) => {
    formik.handleChange(e);
  };

  const allBoxesChecked: () => boolean = () => {
    return levels.every((element) =>
      formik.values.levelsSubmitted.includes(element.level)
    );
  };

  const selectAll: (e: any) => void = (e: any) => {
    formik.handleChange(e);
    console.log(formik.values);
    const l = levels.map((level) => level.level);
    const currentLevels = formik.values.levelsSubmitted;

    if (allBoxesChecked()) {
      const filteredLevels = currentLevels.filter((level: string) => {
        return !l.includes(level);
      });
      formik.setValues({
        ...formik.values,
        levelsSubmitted: filteredLevels
      });
    } else {
      for (let i = 0; i < levels.length; i++) {
        if (!currentLevels.includes(levels[i].level)) {
          currentLevels.push(levels[i].level);
        }
      }
      formik.setValues({
        ...formik.values,
        levelsSubmitted: currentLevels
      });
    }
  };

  const theme = useTheme();
  return (
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary
          sx={{
            paddingRight: 0,
            background: color,
            color: theme.palette.success.contrastText
          }}
        >
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography m={0} variant="h5">
              {name}
            </Typography>
            <Field
              as={Checkbox}
              name="levelsSubmitted"
              sx={{
                color: theme.palette.common.white,
                '&.Mui-checked': {
                  color: theme.palette.common.white
                },
                '&.MuiCheckbox-indeterminate': {
                  color: theme.palette.common.white
                }
              }}
              checked={allBoxesChecked()}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              onChange={(e: any) => {
                selectAll(e);
              }}
            />
          </Stack>
        </AccordionSummary>
        {levels.map((element, idx) => (
          <Stack
            key={`${element.level}-${element.name}}`}
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor={theme.palette.info.light}
            color={theme.palette.common.black}
          >
            <AccordionDetails key={element.level}>
              {element.level}: {element.name}
            </AccordionDetails>
            <Field
              as={Checkbox}
              name="levelsSubmitted"
              value={`${element.level}`} // Formik cannot handle numbers
              sx={{
                color,
                '&.Mui-checked': {
                  color
                }
              }}
              checked={formik.values.levelsSubmitted.includes(
                `${element.level}`
              )}
              onChange={(e: any) => {
                handleCheckboxChange(idx, e);
              }}
            />
          </Stack>
        ))}
      </Accordion>
    </Box>
  );
};

interface RapidRouterTabTitlesProps {
  title: string;
  levels: Array<{ level: string; name: string }>;
  formikProps: FormikProps<any>;
}
const RapidRouterTabTitles: React.FC<RapidRouterTabTitlesProps> = ({
  title,
  levels,
  formikProps
}) => {
  const allCheckboxesSelected: () => boolean = () => {
    return levels
      .map((level) => formikProps.values.levelsSubmitted.includes(level.level))
      .every((el) => el === true);
  };
  const theme = useTheme();
  return (
    <Accordion elevation={0} expanded={false}>
      <AccordionSummary sx={{ cursor: 'default !important', paddingRight: 0 }}>
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography m={0} variant="h5">
            {title}
          </Typography>
          <Checkbox
            checked={allCheckboxesSelected()}
            sx={{
              color: theme.palette.info.dark,
              '&.Mui-checked': {
                color: theme.palette.info.dark
              }
            }}
            onChange={(e) => {
              let lvls: any[] = [];
              if (e.target.checked) {
                const concatArr = levels
                  .map((level) => level.level)
                  .concat(formikProps.values.levelsSubmitted);
                lvls = concatArr.filter(
                  (item, idx) => concatArr.indexOf(item) === idx
                );
              }
              formikProps.setValues({
                ...formikProps.values,
                levelsSubmitted: lvls
              });
            }}
          />
        </Stack>
      </AccordionSummary>
    </Accordion>
  );
};

const RapidRouterAccessSettings: React.FC = () => {
  return (
    <Formik
      initialValues={{
        levelsSubmitted: []
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <pre
            style={{
              position: 'absolute',
              top: 50,
              left: 0
            }}
          >
            <code>
              {JSON.stringify(formik.values.levelsSubmitted, null, 2)}
            </code>
          </pre>
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

const AdditionalClassSettings: React.FC = () => {
  const params = getSearchParams({
    accessCode: { cast: String }
  }) as { accessCode: string };
  const theme = useTheme();
  return (
    <BasePage>
      <PageSection>
        <Typography variant="h4">
          Additional class settings class {'<CLASS NAME>'} ({params.accessCode}
          ))
        </Typography>
        <BackToLinkTextButton
          href={`${paths.teacherClass}?accessCode=${params.accessCode}`}
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
    </BasePage>
  );
};

export default AdditionalClassSettings;
