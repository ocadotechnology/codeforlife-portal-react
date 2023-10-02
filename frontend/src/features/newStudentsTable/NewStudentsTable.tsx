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
  typographyClasses,
  useTheme,
  Box
} from '@mui/material';
import {
  Print as PrintIcon,
  SaveAlt as SaveAltIcon
} from '@mui/icons-material';

import { primary } from 'codeforlife/lib/esm/theme/colors';
import CopyToClipboardIcon from '../../components/CopyToClipboardIcon';
import { useLocation } from 'react-router-dom';
import teachApi from '../../app/api/teacher/teach';
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../../pages/login/MyDocument';

const DownloadButtonPDF: React.FC = () => {
  const location = useLocation();
  const { studentsInfo } = location.state.updatedStudentCredentials;
  const { classLink } = location.state.updatedStudentCredentials;
  console.log(studentsInfo, classLink);
  const downloadPdf = async () => {
    const blob = await pdf(<MyDocument studentsInfo={studentsInfo} classLink={classLink} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Button
      endIcon={<PrintIcon />}
      onClick={downloadPdf}
      className="body"
    >
      Print password reminder cards
    </Button>
  );
};


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
  <TableCell padding="none">
    <Table
      style={{
        marginBottom: 0,
        tableLayout: 'fixed',
        height: '100%'
      }}
    >
      <TableHead className="light">
        <TableRow {...props} />
      </TableHead>
    </Table>
  </TableCell>
);

const BodyRowTableCell: React.FC<TableRowProps> = (props) => (
  <TableCell padding="none">
    <Table
      style={{
        marginBottom: 0,
        tableLayout: 'fixed',
        height: '100%'
      }}
    >
      <TableBody>
        <TableRow {...props} />
      </TableBody>
    </Table>
  </TableCell>
);

export interface NewStudentsTableProps {
  classLink: string;
  students: Array<{
    name: string;
    password: string;
    link: string;
  }>;
}

const NewStudentsTable: React.FC<NewStudentsTableProps> = ({
  students
}) => {
  const nameCellWidth = '40%';
  const passwordCellWidth = '60%';

  const location = useLocation();
  const theme = useTheme();
  const classLink = location.state.updatedStudentCredentials.classLink;
  const accessCode = location.state.updatedStudentCredentials.accessCode;
  const [getReminderCards] = teachApi.useGetReminderCardsMutation();
  return (
    <Box marginBottom={theme.spacing(2)}>
      <Box marginBottom={theme.spacing(6)}>
        <Typography>
          The following credentials have been created for your class. When they
          log in for the first time, you may want students to change their
          passwords to something more memorable. You can reset these details for
          them at any time.
        </Typography>
        <Typography>
          To log on, they will need to enter their name and passwords.
          Alternatively, you can provide them with a direct access link from the
          table below.
        </Typography>
        <Typography color="red" fontWeight="bold">
          You will not be shown this page again, so please make sure you retain
          a copy of the passwords for your records. You can print the reminder
          cards from the button below. Please ensure you share student passwords
          securely.
        </Typography>
        <pre>
          <code>
            {JSON.stringify(location.state, null, 2)}
          </code>
        </pre>
      </Box>
      <Table
        sx={{
          height: '100%',
          tableLayout: 'fixed',
          [`.${typographyClasses.root}`]: {
            marginBottom: 0
          }
        }}
        className="body"
      >
        <TableHead>
          <TableRow>
            <TableCell width="45%">
              <Typography>Option 1 Login details</Typography>
            </TableCell>
            <WhiteTableCell width="10%" />
            <TableCell width="45%">
              <Typography>Option 2 Login links</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Stack direction="row" width="100%" alignItems="center">
                <Typography marginRight={2}>Class link:</Typography>
                <Typography className="nowrap-ellipsis">{classLink} {'lol'}</Typography>
                <CopyToClipboardIcon
                  stringToCopy={classLink}
                  sx={{ marginLeft: 'auto' }}
                />
              </Stack>
            </TableCell>
            <WhiteTableCell>
              <Typography
                style={{
                  color: 'white',
                  backgroundColor: primary[500],
                  borderRadius: '50%',
                  padding: 10,
                  width: 'fit-content',
                  margin: 'auto'
                }}
              >
                OR
              </Typography>
            </WhiteTableCell>
            <TableCell>
              <Typography fontWeight="bold">
                No class code or password required
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <HeadRowTableCell>
              <TableCell width={nameCellWidth}>
                <Typography>Name</Typography>
              </TableCell>
              <TableCell width={passwordCellWidth}>
                <Typography>Password</Typography>
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
                  <Typography>{student.name}</Typography>
                </TableCell>
                <TableCell width={passwordCellWidth}>
                  <Typography>{student.password}</Typography>
                </TableCell>
              </BodyRowTableCell>
              <WhiteTableCell />
              <BodyRowTableCell>
                <TableCell>
                  <Stack direction="row" width="100%" alignItems="center">
                    <Typography className="nowrap-ellipsis">
                      {student.link}
                    </Typography>
                    <CopyToClipboardIcon
                      stringToCopy={student.link}
                      sx={{
                        marginLeft: 'auto'
                      }}
                    />
                  </Stack>
                </TableCell>
              </BodyRowTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* TODO: fix margin bottom */}
      <Stack direction="row" justifyContent="space-between">
        <DownloadButtonPDF />
        <Button
          endIcon={<SaveAltIcon />}
          onClick={() => {
          }}
          className="body"
        >
          Download CSV
        </Button>
      </Stack>
    </Box>
  );
};

export default NewStudentsTable;
