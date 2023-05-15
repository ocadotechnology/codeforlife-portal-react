import { Add, Delete, Edit, UploadFile } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { paths } from 'app/router';
import BackToLinkTextButton from 'components/BackToLinkTextButton';
import { isValidAccessCode } from 'helpers/validAccessCode';
import PageNotFound from 'pages/pageNotFound/PageNotFound';
import React from 'react';
import { useParams } from 'react-router-dom';
import BasePage from 'pages/BasePage';

const AdditionalClassDetails: React.FC = () => {
  return (
    <Stack>
      <Typography variant="h4">Additional class details</Typography>
      <Typography>
        Here you can change settings and permissions for the class and the
        students accessing it. You can also delete classes and change level
        access.
      </Typography>
      <Stack direction="row" columnGap={3}>
        <Button variant="contained" color="tertiary" endIcon={<Edit />}>
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
      <Typography variant="h4">Add new students</Typography>
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
      <AdditionalClassDetails />
    </Stack>
  );
};

const CurrentStudents: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4">Current students</Typography>
      <Typography>
        Select an individual student to change their details, including their
        name and password. Select multiple students using the checkboxes to
        reset their passwords, move them to another class, release them from
        your school and make them an independent Code for Life user, or delete
        them permanently.
      </Typography>
      <Typography>TODO: import the table</Typography>
      <Stack direction="row" justifyContent="flex-end" columnGap={3}>
        <Button variant="contained" color="tertiary">
          Release
        </Button>
        <Button variant="contained" color="tertiary">
          Release
        </Button>
        <Button variant="contained" color="tertiary">
          Release
        </Button>
        <Button variant="contained" color="error">
          Release
        </Button>
      </Stack>
    </Box>
  );
};

const Temp: React.FC = () => {
  let { accessCode } = useParams<{ accessCode: string }>();

  accessCode = accessCode ?? '';
  return (
    <BasePage>
      <Stack>
        <BackToLinkTextButton
          text="Classes"
          href={paths.teacher.class(accessCode)}
        />
        <Typography variant="h4">
          Update details for {'<NAME>'} ({accessCode})
        </Typography>
        <Typography>
          Here you can view and manage all of your students within this class.
          You can add new students, transfer existing students to another one of
          your classes or to another teacher within your school or club, or
          remove students altogether.
        </Typography>
        <CurrentStudents />
        <AddStudents />
      </Stack>
    </BasePage>
  );
};

const StudentManagment: React.FC = (): JSX.Element => {
  const { accessCode } = useParams<{ accessCode: string }>();
  const isValidCode = accessCode && isValidAccessCode(accessCode);
  return isValidCode ? <Temp /> : <PageNotFound />;
};

export default StudentManagment;
