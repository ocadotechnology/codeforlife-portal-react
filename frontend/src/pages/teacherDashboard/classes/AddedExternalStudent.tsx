import React from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Page from 'codeforlife/lib/esm/components/page';
import { paths } from '../../../app/router';

const AddedExternalStudent: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  return (
    <Page.Container>
      <Page.Section>
        <Typography variant="h4" align="center" mb={0}>
          External student added to class {data.className} ({data.classAccessCode})
        </Typography>
      </Page.Section>
      <Page.Section>
        <Typography>
          The student has been successfully added to the class {data.className}.
        </Typography>
        <Typography>
          Please provide the student with their new login details:
        </Typography>
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <Typography>
          <Box component="span" fontWeight='bold'>Class Access Code:</Box> {data.classAccessCode}
        </Typography>
        <Typography>
          <Box component="span" fontWeight='bold'>Name:</Box> {data.studentFirstName}
        </Typography>
      </Page.Section>
      <Page.Section>
        <Typography>
          {data.studentFirstName} should now login as a student with these details.
        </Typography>
        <Typography mb={theme.spacing(7)}>
          {data.studentFirstName} password is unchanged. You may manage this student,
          including changing their name and password, as with other students.
        </Typography>
        <Link className='back-to' onClick={() => {
          navigate(paths.teacher.dashboard.classes._);
        }}>
          Class
        </Link>
      </Page.Section>
    </Page.Container >
  );
};

export default AddedExternalStudent;
