import { DeleteOutlineOutlined, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  Link
} from '@mui/material';
import React from 'react';
import AddStudentsForm from '../../../../features/addStudentsForm/AddStudentsForm';
import CflDataTable from '../../../../components/CflDataTable';
import Page from 'codeforlife/lib/esm/components/page';
import AdditionalClassSettings from './additionalClassSettings/AdditionalClassSettings';

const StudentManagement: React.FC<{
  accessCode: string;
  goBack: () => void;
  additional?: boolean;
}> = ({
  accessCode,
  goBack,
  additional
}) => {
    const theme = useTheme();
    const [showAdditional, setShowAdditional] = React.useState(additional ?? false);

    if (showAdditional) {
      return <AdditionalClassSettings
        accessCode={accessCode}
        goBack={() => { setShowAdditional(false); }}
      />;
    }

    return (
      <Page.Container>
        <Page.Section>
          <Typography variant="h4" align="center">
            Update details for ({accessCode})
          </Typography>
          <Link className='back-to' onClick={goBack}>
            Classes
          </Link>
          <Typography>
            Here you can view and manage all of your students within this class.
            You can add new students, transfer existing students to another one of
            your classes or to another teacher within your school or club, or
            remove students altogether.
          </Typography>
        </Page.Section>
        <Page.Section>
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
        </Page.Section>
        <Page.Section gridProps={{ bgcolor: theme.palette.info.light }}>
          <AddStudentsForm onSubmit={() => {
            alert('submitted');
          }} />
        </Page.Section>
        <Page.Section>
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
                onClick={() => { setShowAdditional(true); }}
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
        </Page.Section>
      </Page.Container>
    );
  };

export default StudentManagement;
