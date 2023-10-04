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
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../../pages/login/MyDocument';

interface StudentInfo {
  name: string;
  password: string;
  classLink: string;
  loginUrl: string;
}

const DownloadButtonCSV: React.FC = () => {
  const generateCSV: (
    studentsInfo: StudentInfo[],
    classLink: string
  ) => string = (studentsInfo, classLink) => {
    let csvContent = 'Name,Password,Class Link,Login URL\n';
    studentsInfo.forEach((student) => {
      csvContent += `${student.name},${student.password},${classLink},${student.loginUrl}\n`;
    });
    return csvContent;
  };
  const location = useLocation();
  const { studentsInfo } = location.state.updatedStudentCredentials;
  const { classLink } = location.state.updatedStudentCredentials;

  const downloadCSV: () => void = () => {
    const csvContent = generateCSV(studentsInfo, classLink);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const linkRef = React.useRef<HTMLAnchorElement | null>(null);
    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = 'data.csv';
      linkRef.current.click();
    }
    URL.revokeObjectURL(url);
  };

  return (
    <Button endIcon={<SaveAltIcon />} className="body" onClick={downloadCSV}>
      Download CSV
    </Button>
  );
};

interface DownloadButtonPDFProps {
  isButtonBanner?: boolean;
}

export const DownloadButtonPDF: React.FC<DownloadButtonPDFProps> = ({ isButtonBanner }) => {
  const location = useLocation();
  const { studentsInfo, classLink } = location.state.updatedStudentCredentials;
  const linkRef = React.useRef<HTMLAnchorElement | null>(null);

  const downloadPdf = async (): Promise<void> => {
    try {
      const blob = await pdf(
        <MyDocument classLink={classLink} studentsInfo={studentsInfo} />
      ).toBlob();
      const url = URL.createObjectURL(blob);

      if (linkRef.current) {
        linkRef.current.href = url;
        linkRef.current.download = 'document.pdf';
        linkRef.current.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const buttonStyles = isButtonBanner ? {
    sx: {
      border: '2px solid black',
      '&:hover': {
        border: '2px solid black',
      },
    }
  } : {};

  return (
    <>
      <Button
        endIcon={<PrintIcon />}
        onClick={() => { void downloadPdf(); }}
        className="body"
        {...buttonStyles}
      >
        Print password reminder cards
      </Button>
      {/* Invisible anchor tag to trigger the download */}
      <a ref={linkRef} style={{ display: 'none' }}></a>
    </>
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

const NewStudentsTable: React.FC<NewStudentsTableProps> = ({ students }) => {
  const nameCellWidth = '40%';
  const passwordCellWidth = '60%';

  const location = useLocation();
  const theme = useTheme();
  const classLink = location.state.updatedStudentCredentials.classLink;
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
                <Typography className="nowrap-ellipsis">
                  {classLink} {'lol'}
                </Typography>
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
        <DownloadButtonCSV />
      </Stack>
    </Box>
  );
};

export default NewStudentsTable;
