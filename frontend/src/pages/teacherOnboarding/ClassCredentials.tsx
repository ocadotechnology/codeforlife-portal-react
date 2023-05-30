import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button
} from '@mui/material';
import {
  Print as PrintIcon,
  SaveAlt as SaveAltIcon,
  Check as CheckIcon
} from '@mui/icons-material';

import {
  CopyIconButton
} from 'codeforlife/lib/esm/components';

const GridRow: React.FC<{
  left: React.ReactElement;
  leftBgcolor?: string;
  middle?: React.ReactElement;
  right: React.ReactElement;
  rightBgcolor?: string;
}> = ({
  left,
  leftBgcolor = 'lightgrey',
  middle,
  right,
  rightBgcolor = 'lightgrey'
}) => (<>
  <Grid
    xs={5.5}
    container
    bgcolor={leftBgcolor}
  >
    {left}
  </Grid>
  <Grid
    xs={1}
    className='flex-center'
  >
    {middle}
  </Grid>
  <Grid
    xs={5.5}
    bgcolor={rightBgcolor}
    className='flex-center-y'
  >
    {right}
  </Grid>
</>);

const ClassCredentials: React.FC = () => {
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
    <Typography>
      The following credentials have been created for your class. When they log in for the first time, you may want students to change their passwords to something more memorable. You can reset these details for them at any time.
    </Typography>
    <Typography>
      To log on, they will need to enter their name and passwords. Alternatively, you can provide them with a direct access link from the table below.
    </Typography>
    <Typography color='red' fontWeight='bold'>
      You will not be shown this page again, so please make sure you retain a copy of the passwords for your records. You can print the reminder cards from the button below. Please ensure you share student passwords securely.
    </Typography>
    <Grid container>
      <GridRow
        left={
          <Typography>
            Option 1 Login details
          </Typography>
        }
        right={
          <Typography>
            Option 2 Login links
          </Typography>
        }
      />
      <GridRow
        left={
          <Stack
            direction='row'
            width='100%'
            alignItems='center'

          >
            <Typography marginRight={2}>
              Class link:
            </Typography>
            <Typography className='nowrap-ellipsis'>
              {classLink}
            </Typography>
            <CopyIconButton
              content={classLink}
              style={{ marginLeft: 'auto' }}
            />
          </Stack>
        }
        middle={
          <Typography>
            OR
          </Typography>
        }
        right={
          <Typography fontWeight='bold'>
            No class code or password required
          </Typography>
        }
      />
      <GridRow
        left={<>
          <Grid xs={5}>
            <Typography>
              Name
            </Typography>
          </Grid>
          <Grid xs={7}>
            <Typography>
              Password
            </Typography>
          </Grid>
        </>}
        right={
          <Typography>
            Copy the links below and share with the student
          </Typography>
        }
      />
      {students.map((student) => (
        <GridRow
          key={student.name}
          left={<>
            <Grid xs={5}>
              <Typography>
                {student.name}
              </Typography>
            </Grid>
            <Grid xs={7}>
              <Typography>
                {student.password}
              </Typography>
            </Grid>
          </>}
          right={
            <Stack
              direction='row'
              width='100%'
              alignItems='center'
            >
              <Typography className='nowrap-ellipsis'>
                {student.link}
              </Typography>
              <CopyIconButton
                content={student.link}
                style={{ marginLeft: 'auto' }}
              />
            </Stack>
          }
        />
      ))}
    </Grid>
    <Stack
      direction='row'
      justifyContent='space-between'
    >
      <Button endIcon={<PrintIcon />}>
        Print password reminder cards
      </Button>
      <Button endIcon={<SaveAltIcon />}>
        Download CSV
      </Button>
    </Stack>
    <Stack alignItems='end'>
      <Button endIcon={<CheckIcon />}>
        Complete setup
      </Button>
    </Stack>
  </>;
};

export default ClassCredentials;
