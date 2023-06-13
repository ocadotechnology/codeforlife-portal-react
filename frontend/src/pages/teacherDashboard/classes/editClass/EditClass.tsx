import { DeleteOutlined, DeleteOutlineOutlined, Edit, SecurityOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Link,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import AddStudentsForm from '../../../../features/addStudentsForm/AddStudentsForm';
import Page from 'codeforlife/lib/esm/components/page';
import AdditionalSettings from './additionalSettings/AdditionalSettings';
import EditStudent from './student/editStudent/EditStudent';
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import ReleaseStudent from './student/releaseStudent/ReleaseStudent';
import MoveStudent from './student/moveStudent/MoveStudent';
import ResetStudent from './student/resetStudent/ResetStudent';

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: theme.palette.info.dark,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    background: theme.palette.action.hover,
    color: theme.palette.common.black
  }
}));

const StudentsTable: React.FC<{
  setStudentID: (studentID: number) => void
  setRelease: (showRelease: boolean) => void
  setMove: (showMove: boolean) => void
  setReset: (showReset: boolean) => void
}> = ({ setStudentID, setRelease, setMove, setReset }) => {
  const randomStudentNames = [
    'John Doe',
    'John Smith',
    'Jane Doe',
    'Jane Smith',
    'John Doe',
    'John Smith'
  ];

  const [checked, setChecked] = React.useState<boolean[]>(
    Array(randomStudentNames.length).fill(false)
  );

  const handleSelectAllClick: () => void = () => {
    if (checked.includes(true)) {
      setChecked(Array(randomStudentNames.length).fill(false));
    } else {
      setChecked(Array(randomStudentNames.length).fill(true));
    }
  };
  const handleChange: (idx: number) => void = (idx: number) => {
    const newChecked = [...checked];
    newChecked[idx] = !checked[idx];
    setChecked(newChecked);
  };
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellStyled>Student details</TableCellStyled>
            <TableCellStyled align="center">
              <Checkbox
                checked={checked.every((el) => el)}
                indeterminate={
                  checked.includes(true) && !checked.every((el) => el)
                }
                onChange={handleSelectAllClick}
              />
            </TableCellStyled>
            <TableCellStyled align="center">Action</TableCellStyled>
          </TableRow>
        </TableHead>
        <TableBody>
          {randomStudentNames.map((studentName, idx) => (
            <TableRow key={`${studentName}-${idx}`}>
              <TableCellStyled>{studentName}</TableCellStyled>
              <TableCellStyled align="center">
                <Checkbox
                  color="primary"
                  checked={checked[idx]}
                  onChange={() => {
                    handleChange(idx);
                  }}
                />
              </TableCellStyled>
              <TableCellStyled align="center">
                <Button onClick={() => {
                  // TODO: Replace idx with actual student ID
                  setStudentID(idx);
                }}
                endIcon={<Edit />}>Edit details</Button>
              </TableCellStyled>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Typography variant="subtitle1">
          {checked.filter((el) => el).length} / {checked.length} selected
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => { setRelease(true); }}
        >Release</Button>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => { setMove(true); }}
        >Move</Button>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => { setReset(true); }}
          endIcon={<SecurityOutlined />}
        >
          Reset password and login link
        </Button>
        <Button
          disabled={!checked.includes(true)}
          endIcon={<DeleteOutlined />}
          className="alert"
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

const EditClass: React.FC<{
  accessCode: string;
  goBack: () => void;
}> = ({
  accessCode,
  goBack
}) => {
    const params = SearchParams.get<{
      additional?: boolean;
      studentID?: number;
      release?: boolean;
      move?: boolean;
      reset?: boolean;
    }>({
      additional: {
        isRequired: false,
        cast: SearchParams.cast.toBoolean
      },
      studentId: {
        isRequired: false
      },
      release: {
        isRequired: false,
        cast: SearchParams.cast.toBoolean
      },
      move: {
        isRequired: false,
        cast: SearchParams.cast.toBoolean
      },
      reset: {
        isRequired: false,
        cast: SearchParams.cast.toBoolean
      }
    });
    const theme = useTheme();
    const [additional, setAdditional] = React.useState(params?.additional);
    const [studentID, setStudentID] = React.useState(params?.studentID);
    const [release, setRelease] = React.useState(params?.release);
    const [move, setMove] = React.useState(params?.move);
    const [reset, setReset] = React.useState(params?.reset);

    if (additional) {
      return <AdditionalSettings
        accessCode={accessCode}
        goBack={() => { setAdditional(false); }}
      />;
    }

    if (studentID !== undefined) {
      return <EditStudent
        accessCode={accessCode}
        goBack={() => { setStudentID(undefined); }}
      />;
    }

    if (release) {
      return <ReleaseStudent
        accessCode={accessCode}
        goBack={() => { setRelease(false); }}
      />;
    }

    if (move) {
      return <MoveStudent
        currentAccessCode={accessCode}
        goBack={() => { setMove(false); }}
      />;
    }

    if (reset) {
      return <ResetStudent
        accessCode={accessCode}
        goBack={() => { setReset(false); }}
      />;
    }

    return <>
      <Page.Section>
        <Typography variant="h4" align="center">
          Update details for Class 1 ({accessCode})
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
          <StudentsTable
            setStudentID={setStudentID}
            setRelease={setRelease}
            setMove={setMove}
            setReset={setReset}
          />
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
              onClick={() => { setAdditional(true); }}
            >
              Edit details
            </Button>
            <Button
              variant="contained"
              className="alert"
              endIcon={<DeleteOutlineOutlined />}
            >
              Delete class
            </Button>
          </Stack>
        </Stack>
      </Page.Section>
    </>;
  };

export default EditClass;
