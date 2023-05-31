import React from 'react';
import {
  Stack,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableRowProps,
  TableCell,
  TableCellProps,
  typographyClasses
} from '@mui/material';
import {
  Print as PrintIcon,
  SaveAlt as SaveAltIcon,
  Check as CheckIcon
} from '@mui/icons-material';

import { CopyIconButton } from 'codeforlife/lib/esm/components';
import { primary } from 'codeforlife/lib/esm/theme/colors';

import { paths } from '../../app/router';

const WhiteTableCell: React.FC<TableCellProps> = ({
  style,
  ...otherTableCellProps
}) => (
  <TableCell
    style={{
      ...style,
      backgroundColor: 'white'
    }}
    {...otherTableCellProps}
  />
);

const HeadRowTableCell: React.FC<TableRowProps> = (props) => (
  <TableCell padding='none'>
    <Table style={{ marginBottom: 0 }}>
      <TableHead className='light'>
        <TableRow {...props} />
      </TableHead>
    </Table>
  </TableCell>
);

const BodyRowTableCell: React.FC<TableRowProps> = (props) => (
  <TableCell padding='none'>
    <Table style={{ marginBottom: 0 }}>
      <TableBody>
        <TableRow {...props} />
      </TableBody>
    </Table>
  </TableCell>
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
      name: 'John',
      password: 'ioykms',
      link: 'https://www.codeforlife.education/'
    }
  ]);

  const nameCellWidth = '40%';
  const passwordCellWidth = '60%';

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
    <Table sx={{
      [`.${typographyClasses.root}`]: {
        marginBottom: 0
      }
    }}>
      <TableHead>
        <TableRow>
          <TableCell width='50%'>
            <Typography>
              Option 1 Login details
            </Typography>
          </TableCell>
          <WhiteTableCell />
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
          <WhiteTableCell>
            <Typography style={{
              color: 'white',
              backgroundColor: primary[500],
              borderRadius: '50%',
              padding: 10
            }}>
              OR
            </Typography>
          </WhiteTableCell>
          <TableCell>
            <Typography fontWeight='bold'>
              No class code or password required
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <HeadRowTableCell>
            <TableCell width={nameCellWidth}>
              <Typography>
                Name
              </Typography>
            </TableCell>
            <TableCell width={passwordCellWidth}>
              <Typography>
                Password
              </Typography>
            </TableCell>
          </HeadRowTableCell>
          <WhiteTableCell />
          <HeadRowTableCell>
            <TableCell>
              <Typography>
                Copy the links below and share with the student
              </Typography>
            </TableCell>
          </HeadRowTableCell>
        </TableRow>
        {students.map((student) => (
          <TableRow key={student.name}>
            <BodyRowTableCell>
              <TableCell width={nameCellWidth}>
                <Typography>
                  {student.name}
                </Typography>
              </TableCell>
              <TableCell width={passwordCellWidth}>
                <Typography>
                  {student.password}
                </Typography>
              </TableCell>
            </BodyRowTableCell>
            <WhiteTableCell />
            <BodyRowTableCell>
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
            </BodyRowTableCell>
          </TableRow>
        ))}
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
