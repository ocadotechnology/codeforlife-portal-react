import { DeleteOutlineOutlined, Edit } from '@mui/icons-material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddStudentsForm from '../../../../features/addStudentsForm/AddStudentsForm';
import { validateAccessCode } from '../../../login/StudentForm';
import PageSection from '../../../../components/PageSection';
import BackToLinkTextButton from '../../../../components/BackToLinkTextButton';
import { paths } from '../../../../app/router';
import DashboardBanner from '../../DashboardBanner';
import DashboardHeader from '../../DashboardHeader';
import BasePage from '../../../BasePage';
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import CflDataTable from '../../../../components/CflDataTable';
import { isValidAccessCode } from '../../../../helpers/validAccessCode';

const AdditionalClassDetails: React.FC = () => {
  const params = SearchParams.get<{
    accessCode: string;
  }>({
    accessCode: {
      isRequired: true,
      validate: SearchParams.validate.matchesSchema(validateAccessCode)
    }
  });
  const accessCode = params?.accessCode ?? '';
  return (
    <Stack>
      <Typography variant="h5">Additional class details</Typography>
      <Typography>
        Here you can change settings and permissions for the class and the
        students accessing it. You can also delete classes and change level
        access.
      </Typography>
      <Stack direction="row" columnGap={3}>
        <Button
          endIcon={<Edit />}
          href={`${paths.teacher.dashboard.class.edit._}?accessCode=${accessCode}`}
        >
          Edit details
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<DeleteOutlineOutlined />}
        >
          Delete class
        </Button>
      </Stack>
    </Stack>
  );
};

const AddStudents: React.FC = () => {
  return (
    <AddStudentsForm
      onSubmit={() => {
        alert('submitted');
      }}
    />
  );
};

const CurrentStudents: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5">Current students</Typography>
      <Typography>
        Select an individual student to change their details, including their
        name and password. Select multiple students using the checkboxes to
        reset their passwords, move them to another class, release them from
        your school and make them an independent Code for Life user, or delete
        them permanently.
      </Typography>
      <CflDataTable />
    </Box>
  );
};

const StudentManagement: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const params = SearchParams.get<{
    accessCode: string;
  }>({
    accessCode: {
      isRequired: true,
      validate: SearchParams.validate.matchesSchema(validateAccessCode)
    }
  });
  React.useEffect(() => {
    if (params === null || !isValidAccessCode(params.accessCode)) {
      navigate(paths.error.internalServerError._);
    }
  }, []);
  const theme = useTheme();
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your classes" />
      <PageSection>
        <Typography variant="h4" align="center">
          Update details for ({params?.accessCode})
        </Typography>
        <BackToLinkTextButton
          text="Classes"
          href={`${paths.teacher.dashboard.classes._}`}
        />
        <Typography>
          Here you can view and manage all of your students within this class.
          You can add new students, transfer existing students to another one of
          your classes or to another teacher within your school or club, or
          remove students altogether.
        </Typography>
      </PageSection>
      <PageSection>
        <CurrentStudents />
      </PageSection>
      <PageSection bgcolor={theme.palette.info.light}>
        <AddStudents />
      </PageSection>
      <PageSection>
        <AdditionalClassDetails />
      </PageSection>
    </BasePage>
  );
};

export default StudentManagement;
