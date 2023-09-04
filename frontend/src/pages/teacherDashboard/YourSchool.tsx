import {
  Grid,
  Typography,
  Button,
  useTheme,
  InputAdornment,
  Stack
} from '@mui/material';
import React from 'react';
import {
  Add,
  Create,
  DeleteOutline,
  DoDisturbOnOutlined,
  DoNotDisturb,
  EmailOutlined,
  PersonOutlined
} from '@mui/icons-material';
import { INVITE_TEACHER_SCHEMA, SCHOOL_DETAILS_UPDATE_SCHEMA } from './schemas';
import { INVITE_TEACHER_INITIAL_VALUES } from './constants';
import CflTable, {
  CflTableBody,
  CflTableCellElement
} from '../../components/CflTable';
import {
  TextField,
  CheckboxField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { CflHorizontalForm } from '../../components/form/CflForm';
import Page from 'codeforlife/lib/esm/components/page';
import SchoolNameField from '../../components/form/SchoolNameField';
import SchoolPostcodeField from '../../components/form/SchoolPostcodeField';
import SchoolCountryField from '../../components/form/SchoolCountryField';
import { useLeaveOrganisationMutation } from '../../app/api/endpoints/organisation';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../app/router';
import {
  useDeleteInviteMutation,
  useInviteTeacherMutation,
  useInviteToggleAdminMutation,
  useResendInviteMutation,
  useToggleAdminMutation,
  useUpdateSchoolMutation
} from '../../app/api/endpoints/teacher/dashboard';

const InviteTeacherForm: React.FC = () => {
  const [inviteTeacher] = useInviteTeacherMutation();
  return (
    <CflHorizontalForm
      header="Invite a teacher to your school"
      initialValues={INVITE_TEACHER_INITIAL_VALUES}
      validationSchema={INVITE_TEACHER_SCHEMA}
      onSubmit={(values) => {
        const firstName = values.teacherFirstName;
        const lastName = values.teacherLastName;
        inviteTeacher(values).unwrap()
          .then(() => {
            alert(`You have invited ${firstName} ${lastName} to your school.`);
          })
          .catch((err) => { console.error('InviteTeacher error', err); });
      }}
      submitButton={<SubmitButton>Invite teacher</SubmitButton>}
    >
      <TextField
        placeholder="First name of teacher"
        helperText="Enter first name of teacher"
        name="teacherFirstName"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PersonOutlined />
            </InputAdornment>
          )
        }}
      />
      <TextField
        placeholder="Teacher's last name"
        helperText="Enter the teacher's last name"
        name="teacherLastName"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PersonOutlined />
            </InputAdornment>
          )
        }}
      />
      <TextField
        placeholder="Teacher's email"
        helperText="Enter the teacher's email"
        name="teacherEmail"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailOutlined />
            </InputAdornment>
          )
        }}
      />
      <CheckboxField
        name="isAdmin"
        formControlLabelProps={{
          label: 'Make an administrator of the school'
        }}
      />
    </CflHorizontalForm>
  );
};

const UpdateSchoolDetailsForm: React.FC<{
  schoolData: any;
}> = ({ schoolData }) => {
  const schoolName = schoolData.name;
  const schoolPostcode = schoolData.postcode;
  const schoolCountry = schoolData.country;
  const [updateSchool] = useUpdateSchoolMutation();
  return (
    <CflHorizontalForm
      header="Update details of your school or club"
      subheader="Update your school or club's name and/or postcode"
      initialValues={{
        name: schoolName,
        postcode: schoolPostcode,
        country: schoolCountry
      }}
      validationSchema={SCHOOL_DETAILS_UPDATE_SCHEMA}
      onSubmit={(values) => {
        // TODO: messages: "You have updated the details for your school or club successfully.")
        updateSchool(values).unwrap()
          .then()
          .catch((err) => { console.error('UpdateSchool error: ', err); });
        alert(JSON.stringify(values, null, 2));
      }}
      submitButton={<SubmitButton>Update details</SubmitButton>}
    >
      <SchoolNameField />
      <SchoolPostcodeField />
      <SchoolCountryField />
    </CflHorizontalForm>
  );
};

const TeachersTableActions: React.FC<{
  isInvite: boolean;
  teacherEmail: string;
  userEmail: string;
  isTeacherAdmin: boolean;
  id: string;
  token?: string;
  twoFactorAuthentication?: boolean;
}> = ({ isInvite, teacherEmail, userEmail, isTeacherAdmin, id, token, twoFactorAuthentication }) => {
  const [toggleAdmin] = useToggleAdminMutation();
  const [inviteToggleAdmin] = useInviteToggleAdminMutation();
  const [resendInvite] = useResendInviteMutation();
  const [deleteInvite] = useDeleteInviteMutation();

  const onToggleAdmin = (id: string) => () => {
    // TODO: messages.success(request, "Administrator status has been given successfully.")
    //      messages.success(request, "Administrator status has been revoked successfully.")
    toggleAdmin({ id }).unwrap()
      .then()
      .catch((err) => { console.error('ToggleAdmin error: ', err); });
  };

  const onInviteToggleAdmin = (id: string) => () => {
    // TODO: messages.success(request, "Administrator invite status has been given successfully")
    //       messages.success(request, "Administrator invite status has been revoked successfully")
    inviteToggleAdmin({ id }).unwrap()
      .then()
      .catch((err) => { console.error('InviteToggleAdmin error: ', err); });
  };

  const onResendInvite = (token: string) => () => {
    // messages.success(request, "Teacher re-invited!")
    resendInvite({ token }).unwrap()
      .then()
      .catch((err) => { console.error('ResendInvite error: ', err); });
  };

  const onDeleteInvite = (token: string) => () => {
    // messages.success(request, f"Invite for {invite_teacher_first_name} successfully deleted")
    deleteInvite({ token }).unwrap()
      .then()
      .catch((err) => { console.error('DeleteInvite error: ', err); });
  };

  if (isInvite) {
    return (
      <>
        {isTeacherAdmin
          ? <Button className={isTeacherAdmin && 'alert'} endIcon={<DoNotDisturb />} onClick={onInviteToggleAdmin(id)}>
            Revoke admin
          </Button>
          : <Button endIcon={<Add />} onClick={onInviteToggleAdmin(id)}>
            Make admin
          </Button>
        }
        <Button endIcon={<EmailOutlined />} onClick={onResendInvite(token as string)}>Resend invite</Button>
        <Button className="alert" endIcon={<DeleteOutline />} onClick={onDeleteInvite(token as string)}>Delete</Button>
      </>
    );
  } else {
    if (teacherEmail === userEmail) {
      return (
        <>
          <Button endIcon={<Create />}>Update details</Button>
          {/* This button below will be used for pending invites  */}
          <Button endIcon={<EmailOutlined />}>Resend invite</Button>
        </>
      );
    } else if (isTeacherAdmin) {
      return (
        <>
          <Button className="alert" endIcon={<DoNotDisturb />} onClick={onToggleAdmin(id)}>
            Revoke admin
          </Button>
          <Button className="alert" endIcon={<DeleteOutline />}>
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button endIcon={<Add />} onClick={onToggleAdmin(id)}>Make admin</Button>
          {twoFactorAuthentication
            ? <Button endIcon={<DoDisturbOnOutlined />} className="alert">
              Disable 2FA
            </Button>
            : <></>
          }
        </>
      );
    }
  }
};

const TeachersTable: React.FC<{
  isUserAdmin: boolean;
  teachersData: any;
  sentInvites: any;
}> = ({ isUserAdmin, teachersData, sentInvites }) => {
  // TODO: const { email } = getUser();
  const email = 'alberteinstein@codeforlife.com';
  const boldText: React.FC<string> = (str: string) => (
    <Typography variant="body2" fontWeight="bold">
      ({str})
    </Typography>
  );

  return (
    <CflTable
      className="body"
      titles={isUserAdmin ? ['Name', 'Administrator status', 'Actions'] : ['Name', 'Administrator status']}
    >
      {teachersData.map(
        ({ teacherFirstName, teacherLastName, teacherEmail, isTeacherAdmin, id }: any) => (
          <CflTableBody key={id}>
            <CflTableCellElement>
              <Typography variant="subtitle1">
                {teacherFirstName} {teacherLastName} {teacherEmail === email ? boldText('you') : ''}{' '}
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
            {isUserAdmin &&
              <CflTableCellElement justifyContent="center">
                <TeachersTableActions
                  {...{
                    isInvite: false,
                    teacherEmail,
                    userEmail: email,
                    isTeacherAdmin,
                    id
                  }}
                />
              </CflTableCellElement>
            }
          </CflTableBody>
        )
      )}
      {sentInvites.map(
        ({ invitedTeacherFirstName, invitedTeacherLastName, invitedTeacherEmail, invitedTeacherIsAdmin, isExpired, id, token }: any) => (
          <CflTableBody key={token}>
            <CflTableCellElement>
              <Typography variant="subtitle1">
                {invitedTeacherFirstName} {invitedTeacherLastName} {isExpired ? boldText('expired') : boldText('pending')}{' '}
              </Typography>
            </CflTableCellElement>
            <CflTableCellElement
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Typography variant="subtitle1">
                {invitedTeacherIsAdmin ? 'Teacher Administrator' : 'Standard Teacher'}
              </Typography>
              <Typography variant="subtitle1">({invitedTeacherEmail}) </Typography>
            </CflTableCellElement>
            {isUserAdmin &&
              <CflTableCellElement justifyContent="center">
                <TeachersTableActions
                  {...{
                    isInvite: true,
                    teacherEmail: invitedTeacherEmail,
                    userEmail: email,
                    isTeacherAdmin: invitedTeacherIsAdmin,
                    id,
                    token
                  }}
                />
              </CflTableCellElement>
            }
          </CflTableBody>
        )
      )}
    </CflTable>
  );
};

const YourSchool: React.FC<{
  data: any;
}> = ({ data }) => {
  const theme = useTheme();
  const [leaveOrganisation] = useLeaveOrganisationMutation();
  const navigate = useNavigate();
  const isAdmin = true;
  // TODO: const isAdmin = data.isAdmin;
  const onLeaveOrganisation = (): void => {
    leaveOrganisation().unwrap()
      .then((res) => {
        if (res?.hasClasses) {
          navigate(paths.teacher.dashboard.school.leave._, { state: { classes: res.classes, teachers: res.teachers } });
        } else {
          navigate(paths.teacher.onboarding._, { state: { leftOrganisation: true } });
        }
      })
      .catch((err) => { console.log('LeaveOrganisation error: ', err); });
  };

  return <>
    <Page.Section>
      <Typography align="center" variant="h4">
        Your school: {data.school.name} ({data.school.postcode})
      </Typography>
    </Page.Section>
    <Page.Section sx={{ paddingTop: 0 }}>
      {isAdmin
        ? <>
          <Typography mb={0}>
            As an administrator of your school or club, you can select other
            teachers to whom you can provide or revoke administrative rights. You
            can also add and remove teachers from your school or club. As
            administrator, you have the ability to see and amend other
            teachers&apos; classes. Please bear this in mind when assigning admin
            rights to other teachers.
          </Typography>
          <Page.Section sx={{ paddingBottom: 0 }}>
            <InviteTeacherForm />
          </Page.Section>
        </>
        : <Stack alignItems="center">
          <Typography variant="h5" marginTop={0} marginBottom={theme.spacing(5)}>
            You can see which other teachers in your school or club are registered here.
            Should you need to leave the school or club, you can do so below.
          </Typography>
          <Button onClick={onLeaveOrganisation}>
            Leave school or club
          </Button>
        </Stack>
      }
    </Page.Section >
    <Page.Section>
      <Typography variant="h5">
        These teachers are already part of your school or club
      </Typography>
      <TeachersTable isUserAdmin={isAdmin} teachersData={data.coworkers} sentInvites={data.sentInvites} />
      {isAdmin &&
        <Grid container columnSpacing={5}>
          <Grid item sm={6}>
            <Typography mb={0}>
              Select &apos;Delete&apos; to delete a teacher from your school or
              club. You will be able to move any existing classes assigned to
              that teacher to other teachers in your school or club.
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography fontWeight="bold" color="error" mb={0}>
              We strongly recommend that administrators who are using 2FA ensure
              there is another administrator who will be able to disable their
              2FA should they have problems with their smartphone or tablet.
            </Typography>
          </Grid>
        </Grid>
      }
    </Page.Section>
    {isAdmin &&
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <UpdateSchoolDetailsForm schoolData={data.school} />
      </Page.Section>
    }
  </>;
};

export default YourSchool;
