import React from 'react';
import ClassCredentials from '../../../../../teacherOnboarding/ClassCredentials';
import Page from 'codeforlife/lib/esm/components/page';
import { Print } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
const UpdatedStudentCredentials: React.FC = () => {
  const location = useLocation();
  const accessCode: string = location.state?.updatedStudentCredentials.accessCode;
  const className: string = location.state?.updatedStudentCredentials.class;
  return <Page.Container>
    <Page.Banner
      header={`${className}, (${accessCode})`}
      textAlign='center'
      subheader='Class and class access code:' />
    <Page.Notification>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '2%'
      }} >
        {/* TODO: Update the Page.Notification component to handle buttons
        and style it using the production style properties */}
        {/* TODO: Add a way to format the icon in front of the notification message */}
        <Typography mb={0}>
          This is the only time you will be able to view this page. You can print reminder cards or download as a CSV file.
        </Typography>
        <Button sx={{
          border: '2px solid black',
          '&:hover': {
            border: '2px solid black',
          }
        }} variant='outlined' color='secondary' endIcon={<Print />}>Print reminder cards</Button>
      </Box>
    </Page.Notification>
    <Page.Section>
      <ClassCredentials />
    </Page.Section>
  </Page.Container >;
};

export default UpdatedStudentCredentials;
