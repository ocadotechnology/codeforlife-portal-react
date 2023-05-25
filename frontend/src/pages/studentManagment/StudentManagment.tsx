import {
  Add,
  Check,
  Delete,
  DeleteOutlined,
  Edit,
  UploadFile
} from '@mui/icons-material';
import { Box, Checkbox, Button, Stack, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { paths } from '../../app/router';
import BackToLinkTextButton from '../../components/BackToLinkTextButton';
import { isValidAccessCode } from '../../helpers/validAccessCode';
import PageNotFound from '../pageNotFound/PageNotFound';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BasePage from '../BasePage';
import { getSearchParams } from 'codeforlife/lib/esm/helpers';
import PageSection from '../../components/PageSection';
import { useTheme } from '@mui/material';
import DashboardHeader from '../teacherDashboard/DashboardHeader';
import DashboardBanner from '../teacherDashboard/DashboardBanner';
import CflDataTable from '../../components/CflDataTable';
// import BasePage from 'pages/BasePage';

interface AdditionalClassDetailsParamsProps {
  accessCode: string;
}
const AdditionalClassDetails: React.FC = () => {
  const params = getSearchParams({
    accessCode: { cast: String }
  }) as AdditionalClassDetailsParamsProps;
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
          variant="contained"
          color="tertiary"
          endIcon={<Edit />}
          href={`${paths.teacherClassEdit}?accessCode=${params?.accessCode}`}
        >
          Edit details
        </Button>
        <Button variant="contained" color="error" endIcon={<Delete />}>
          Delete class
        </Button>
      </Stack>
    </Stack>
  );
};

const AddStudents: React.FC = () => {
  const addStudentsTextAreaPlaceholder =
    'You can import names from a .CSV file, or copy and paste them from a spreadsheet directly into this text box';
  return (
    <Stack>
      <Typography variant="h5">Add new students</Typography>
      <Typography>
        Add the student names to the box with one name per line or separated by
        a comma.
      </Typography>
      <Typography>
        Student names and the class access code are required to sign in.
      </Typography>

      <Button variant="outlined" color="tertiary" endIcon={<UploadFile />}>
        Import CSV file{' '}
      </Button>
      <Typography variant="subtitle1">
        Please note: if using the import option, student names must be under a
        heading labelled &apos;name&apos;.
      </Typography>
      <Stack direction="row" alignItems="flex-end" columnGap={3}>
        {/* The default comes with no styling
        TODO: Follow the docs https://mui.com/base/react-textarea-autosize/
        to style the textarea
        */}
        <TextareaAutosize
          placeholder={addStudentsTextAreaPlaceholder}
          cols={80}
          minRows={10}
        />
        <Button variant="contained" color="tertiary" endIcon={<Add />}>
          Add students
        </Button>
      </Stack>
    </Stack>
  );
};

const CurrentStudents: React.FC = () => {
  const randomStudentNames: string[] = ['Student 1', 'Student 2', 'Student 3'];
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

interface StudentManagmentProps {
  accessCode: string;
}

const StudentManagment: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const params = getSearchParams({
    accessCode: { cast: String }
  }) as StudentManagmentProps | null;
  React.useEffect(() => {
    if (params === null || !isValidAccessCode(params.accessCode)) {
      navigate(paths.internalServerError);
    }
  }, []);
  const theme = useTheme();
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your classes" />
      <PageSection>
        <Typography variant="h5" align="center">
          Update details for ({params?.accessCode} )
        </Typography>
        <BackToLinkTextButton text="Classes" href={paths.teacherClass} />
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

export default StudentManagment;
