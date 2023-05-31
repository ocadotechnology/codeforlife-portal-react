import React from 'react';
import {
  Stack,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import {
  Print as PrintIcon,
  SaveAlt as SaveAltIcon,
  Check as CheckIcon
} from '@mui/icons-material';

import { CopyIconButton } from 'codeforlife/lib/esm/components';
import { primary } from 'codeforlife/lib/esm/theme/colors';

import { paths } from '../../app/router';

const NamePasswordTable: React.FC<{
  students: Array<{
    name: string;
    password: string;
  }>;
}> = ({ students }) => (
  <Table style={{ marginBottom: 0 }}>
    <TableHead className='light'>
      <TableRow>
        <TableCell width='40%'>
          <Typography>
            Name
          </Typography>
        </TableCell>
        <TableCell width='60%'>
          <Typography>
            Password
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {students.map((student) => (
        <TableRow key={student.name}>
          <TableCell>
            <Typography>
              {student.name}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {student.password}
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const LinkTable: React.FC<{
  students: Array<{
    name: string;
    link: string;
  }>;
}> = ({ students }) => (
  <Table style={{ marginBottom: 0 }}>
    <TableHead className='light'>
      <TableRow>
        <TableCell>
          <Typography>
            Copy the links below and share with the student
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {students.map((student) => (
        <TableRow key={student.name}>
          <TableCell>
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
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ClassCredentials: React.FC = () => {
  // TODO: get from API.
  const classLink = 'https://www.codeforlife.education/';
  const students: Array<{
    name: string;
    password: string;
    link: string;
  }> = ([
    {
      name: 'John ds fj jer gjre gjr gktr htrjk hjt hkjt hkty hytkj hytkj hytkh ty',
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width='50%'>
            <Typography>
              Option 1 Login details
            </Typography>
          </TableCell>
          <TableCell style={{
            backgroundColor: 'white'
          }} />
          <TableCell width='50%'>
            <Typography>
              Option 2 Login links
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
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
          </TableCell>
          <TableCell style={{
            backgroundColor: 'white'
          }}>
            <Typography style={{
              color: 'white',
              backgroundColor: primary[500],
              borderRadius: '50%',
              padding: 10
            }}>
              OR
            </Typography>
          </TableCell>
          <TableCell>
            <Typography fontWeight='bold'>
              No class code or password required
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding='none'>
            <NamePasswordTable students={students} />
          </TableCell>
          <TableCell style={{
            backgroundColor: 'white'
          }} />
          <TableCell padding='none'>
            <LinkTable students={students} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    {/* TODO: fix margin bottom */}
    <Stack
      direction='row'
      justifyContent='space-between'
    >
      <Button
        endIcon={<PrintIcon />}
        onClick={() => { alert('TODO: call api'); }}
      >
        Print password reminder cards
      </Button>
      <Button
        endIcon={<SaveAltIcon />}
        onClick={() => { alert('TODO: call api'); }}
      >
        Download CSV
      </Button>
    </Stack>
    <Stack alignItems='end'>
      {/* TODO: fix button style variant */}
      <Button
        endIcon={<CheckIcon />}
        href={paths.teacherSchool}
      >
        Complete setup
      </Button>
    </Stack>
  </>;
};

export default ClassCredentials;
