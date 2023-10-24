import { ChevronLeft } from '@mui/icons-material';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import Page from 'codeforlife/lib/esm/components/page';
import React from 'react';
import NewStudentsTable from '../../../../../../features/newStudentsTable/NewStudentsTable';

const ResetStudent: React.FC<{
  accessCode: string;
  studentIds: number[];
  goBack: () => void;
}> = ({ accessCode, studentIds, goBack }) => {
  const theme = useTheme();

  return (
    <>
      <Page.Section>
        <Typography variant="h5" marginTop={theme.spacing(3)}>
          Students&apos; passwords reset for class Class 1 ({accessCode})
        </Typography>
        <NewStudentsTable
          accessCode={accessCode}
          users={[]} // TODO: convert student Ids to users
        />
        <Stack>
          <Button
            startIcon={<ChevronLeft />}
            variant="outlined"
            onClick={goBack}
          >
            Back to class
          </Button>
        </Stack>
      </Page.Section>
    </>
  );
};

export default ResetStudent;
