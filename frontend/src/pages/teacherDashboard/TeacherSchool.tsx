import { Container, Grid, Typography, Button, useTheme } from '@mui/material';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import BasePage from '../BasePage';
import React from 'react';
import { Add, CopyAll, Create, DoNotDisturb } from '@mui/icons-material';
import { INVITE_TEACHER_SCHEMA, SCHOOL_DETAILS_UPDATE_SCHEMA } from './schemas';
import { INVITE_TEACHER_INITIAL_VALUES } from './constants';
import CflTable, {
  CflTableBody,
  CflTableCellElement
} from '../../components/CflTable';
import {
  TeacherData,
  getSchool,
  getTeachersData,
  getUser
} from './dummyMethods';
import CflTextField from '../../components/formik/CflTextField';
import CflCheckboxField from '../../components/formik/CflCheckboxField';
import { getNames } from 'country-list';
import { CflHorizontalForm } from '../../components/formik/CflForm';
import CflAutocomplete from '../../components/formik/CflAutoComplete';
import PageSection from '../../components/PageSection';

const InviteTeacherForm: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <CflHorizontalForm
      header="Invite a teacher to your school"
      initialValues={INVITE_TEACHER_INITIAL_VALUES}
      validationSchema={INVITE_TEACHER_SCHEMA}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      submitButton={
        <Button variant="contained" color="tertiary" type="submit">
          Invite teacher
        </Button>
      }
    >
      <CflTextField
        placeholder="Teacher's first name"
        helperText="Enter the teacher's name"
        name="teacherFirstName"
      />
      <CflTextField
        placeholder="Teacher's last name"
        helperText="Enter the teacher's last name"
        name="teacherLastName"
      />
      <CflTextField
        placeholder="Teacher's email"
        helperText="Enter the teacher's email"
        name="teacherEmail"
      />
      <CflCheckboxField
        name="isAdmin"
        sx={{ color: theme.palette.info.dark }}
        formControlLabelProps={{
          label: 'Make an administrator of the school'
        }}
      />
    </CflHorizontalForm>
  );
};

const UpdateSchoolDetailsForm: React.FC = (): JSX.Element => {
  const { schoolName, schoolPostcode, schoolCountry } = getSchool();
  return (
    <CflHorizontalForm
      header="Update details of your school or club"
      subheader="Update your school or club's name and/or postcode"
      initialValues={{
        schoolCountry,
        schoolPostcode,
        schoolName
      }}
      validationSchema={SCHOOL_DETAILS_UPDATE_SCHEMA}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      submitButton={
        <Button type="submit" color="tertiary">
          Update details
        </Button>
      }
    >
      <CflTextField
        placeholder="Name of school or club"
        helperText="Enter your school's name"
        name="schoolName"
      />
      <CflTextField
        placeholder="Postcode / Zipcode"
        helperText="Enter your school's postcode"
        name="schoolPostcode"
      />
      <CflAutocomplete
        options={getNames()}
        defaultValue={schoolCountry}
        cflTextFieldProps={{
          name: 'schoolCountry',
          placeholder: 'Country',
          helperText: "Enter your school's country"
        }}
      />
      {/*
      <Autocomplete
        options={getNames()}
        defaultValue={schoolCountry}
        onChange={(event, value) => {
          console.log(value);
        }}
        renderInput={(params) => (
          <CflTextField
            {...params}
            placeholder="Country"
            helperText="Enter your school's country"
            name="schoolCountry"
          />
        )}
      />
        */}
    </CflHorizontalForm>
  );
};

const TeachersTableActions: React.FC<{
  teacherEmail: string;
  userEmail: string;
  isTeacherAdmin: boolean;
}> = ({ teacherEmail, userEmail, isTeacherAdmin }): JSX.Element => {
  if (teacherEmail === userEmail) {
    return (
      <Button endIcon={<Create />} color="tertiary">
        Update details
      </Button>
    );
  } else if (isTeacherAdmin) {
    return (
      <>
        <Button color="error" endIcon={<DoNotDisturb />}>
          Revoke admin
        </Button>
        <Button color="error">Delete</Button>
      </>
    );
  } else {
    return (
      <>
        <Button endIcon={<Add />}>Make admin </Button>
      </>
    );
  }
};

const TeachersTable: React.FC = (): JSX.Element => {
  const { firstName, lastName, email } = getUser();
  const teachersData = getTeachersData();

  return (
    <CflTable titles={['Name', 'Administrator status', 'Actions']}>
      {teachersData.map(
        ({ teacherName, isTeacherAdmin, teacherEmail }, keyIdx: number) => (
          <CflTableBody key={`${keyIdx}`}>
            <CflTableCellElement>
              <Typography variant="subtitle1">
                {teacherName} {teacherEmail === email ? '(you)' : ''}{' '}
              </Typography>
            </CflTableCellElement>
            <CflTableCellElement
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Typography variant="subtitle1">
                {isTeacherAdmin ? 'Teacher Administrator' : 'Standard Teacher'}
              </Typography>
              <Typography variant="subtitle1">({teacherEmail}) </Typography>
            </CflTableCellElement>
            <CflTableCellElement justifyContent="center">
              <TeachersTableActions
                {...{
                  teacherEmail,
                  userEmail: email,
                  isTeacherAdmin
                }}
              />
            </CflTableCellElement>
          </CflTableBody>
        )
      )}
    </CflTable>
  );
};
const TeacherSchool: React.FC = (): JSX.Element => {
  const { schoolName, accessCode } = getSchool();
  const theme = useTheme();
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your school" />
      <PageSection>
        <Typography align="center" variant="h5">
          Your school: {schoolName}: {accessCode}
        </Typography>
        <Typography>
          As an administrator of your school or club, you can select other
          teachers to whom you can provide or revoke administrative rights. You
          can also add and remove teachers from your school or club. As
          administrator, you have the ability to see and amend other
          teachers&apos; classes. Please bear this in mind when assigning admin
          rights to other teachers.
        </Typography>
        <Typography variant="h5">
          These teachers are already part of your school or club
        </Typography>
        <TeachersTable />
        <Grid container>
          <Grid item sm={6}>
            <Typography>
              Select &apos;Delete&apos; to delete a teacher from your school or
              club. You will be able to move any existing classes assigned to
              that teacher to other teachers in your school or club.
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography fontWeight="bold" color="error">
              We strongly recommend that administrators who are using 2FA ensure
              there is another administrator who will be able to disable their
              2FA should they have problems with their smartphone or tablet.
            </Typography>
          </Grid>
        </Grid>
      </PageSection>
      <PageSection bgcolor={theme.palette.info.main}>
        <UpdateSchoolDetailsForm />
      </PageSection>
    </BasePage>
  );
};

export default TeacherSchool;
