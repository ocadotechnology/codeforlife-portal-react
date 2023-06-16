import { DeleteOutlined, DeleteOutlineOutlined, Edit, SecurityOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
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

const viewOptions = [
  'additional',
  'edit',
  'release',
  'move',
  'reset'
] as const;

const StudentsTable: React.FC<{
  setStudentIds: (studentIds: number[]) => void
  setView: (setView: typeof viewOptions[number]) => void
}> = ({ setStudentIds, setView }) => {
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
  const selectedStudentsIds: number[] = [];

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
    selectedStudentsIds.push(idx);
  };
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Student details</Typography>
            </TableCell>
            <TableCell align="center">
              <Checkbox
                checked={checked.every((el) => el)}
                indeterminate={
                  checked.includes(true) && !checked.every((el) => el)
                }
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell align="center">
              <Typography>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {randomStudentNames.map((studentName, idx) => (
            <TableRow key={`${studentName}-${idx}`}>
              <TableCell>
                <Typography variant="body2">{studentName}</Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  color="primary"
                  checked={checked[idx]}
                  onChange={() => {
                    handleChange(idx);
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => {
                  // TODO: Replace idx with actual student ID
                  setView('edit');
                  setStudentIds([idx]);
                }}
                endIcon={<Edit />}>Edit details</Button>
              </TableCell>
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
          onClick={() => {
            setView('release');
            setStudentIds(selectedStudentsIds);
          }}
        >Release</Button>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => {
            setView('move');
            setStudentIds(selectedStudentsIds);
          }}
        >Move</Button>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => {
            setView('reset');
            setStudentIds(selectedStudentsIds);
          }}
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
      view?: typeof viewOptions[number];
      studentIds?: number[];
    }>({
      view: {
        isRequired: false,
        validate: SearchParams.validate.inOptions(viewOptions)
      },
      studentIds: {
        isRequired: false,
        cast: (param: string) => { param.split(',').map(Number); }
      }
    });
    const theme = useTheme();
    const [view, setView] = React.useState(params?.view);
    const [studentIds, setStudentIds] = React.useState(params?.studentIds);
    if (view === 'additional') {
      return <AdditionalSettings
        accessCode={accessCode}
        goBack={() => { setView(undefined); }}
      />;
    }
    if (studentIds !== undefined) {
      switch (view) {
        case 'edit':
          return <EditStudent
            accessCode={accessCode}
            studentId={studentIds[0]}
            goBack={() => { setStudentIds(undefined); setView(undefined); }}
          />;
        case 'release':
          return <ReleaseStudent
            accessCode={accessCode}
            studentIds={studentIds}
            goBack={() => { setStudentIds(undefined); setView(undefined); }}
          />;
        case 'move':
          return <MoveStudent
            currentAccessCode={accessCode}
            studentIds={studentIds}
            goBack={() => { setStudentIds(undefined); setView(undefined); }}
          />;
        case 'reset':
          return <ResetStudent
            accessCode={accessCode}
            studentIds={studentIds}
            goBack={() => { setStudentIds(undefined); setView(undefined); }}
          />;
      }
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
            setStudentIds={setStudentIds}
            setView={setView}
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
              onClick={() => { setView('additional'); }}
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
