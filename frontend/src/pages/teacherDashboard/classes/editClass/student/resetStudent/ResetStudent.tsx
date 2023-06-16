import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Stack, Typography } from '@mui/material';
import NewStudentsTable from '../../../../../../features/newStudentsTable/NewStudentsTable';
import { ChevronLeft } from '@mui/icons-material';

const ResetStudent: React.FC<{
  accessCode: string;
  studentIds: number[];
  goBack: () => void;
}> = ({
  accessCode,
  studentIds,
  goBack
}) => {
  // TODO: get from API and use params
  const classLink = 'https://www.codeforlife.education/';
  const students: Array<{
    name: string;
    password: string;
    link: string;
  }> = ([
    {
      name: 'John',
      password: 'ioykms',
      link: 'https://www.codeforlife.education/'
    }
  ]);

  return <>
    <Page.Section>
      <Typography variant='h5'>
        Students&apos; passwords reset for class Class 1 ({accessCode})
      </Typography>
      <NewStudentsTable
        classLink={classLink}
        students={students}
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
  </>;
};

export default ResetStudent;
