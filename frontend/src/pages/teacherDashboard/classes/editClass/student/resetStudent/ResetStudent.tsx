import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Stack, Typography } from '@mui/material';
import NewStudentsTable from '../../../../../../features/newStudentsTable/NewStudentsTable';
import { ChevronLeft } from '@mui/icons-material';

const ResetStudent: React.FC<{
  className: string;
  accessCode: string;
  goBack: () => void;
}> = ({
  className,
  accessCode,
  goBack
}) => {
  // TODO: get from API.
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
        Students&apos; passwords reset for class {className} ({accessCode})
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
