import React from 'react';
import {
  useNavigate,
  useParams,
  generatePath,
  useLocation
} from 'react-router-dom';
import {
  DeleteOutlined,
  DeleteOutlineOutlined,
  Edit,
  SecurityOutlined
} from '@mui/icons-material';
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
import * as yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';

import { paths } from '../../../../app/router';
import AddStudentsForm from '../../../../features/addStudentsForm/AddStudentsForm';
import AdditionalSettings from './additionalSettings/AdditionalSettings';
import EditStudent from './student/editStudent/EditStudent';
import ReleaseStudent from './student/releaseStudent/ReleaseStudent';
import MoveStudent from './student/moveStudent/MoveStudent';
import ResetStudent from './student/resetStudent/ResetStudent';
import { useGetStudentsByAccessCodeQuery } from '../../../../app/api/';

const StudentsTable: React.FC<{
  accessCode: string;
}> = ({ accessCode }) => {
  const _navigate = useNavigate();

  function navigate(path: string, studentIds: number[]): void {
    _navigate(generatePath(
      path.replace('{studentIds}', studentIds.join(',')),
      { accessCode }
    ));
  }

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
  const selectedStudentsIds: number[] = [1, 2, 3];

  const handleSelectAllClick: () => void = () => {
    if (checked.includes(true)) {
      setChecked(Array(randomStudentNames.length).fill(false));
    } else {
      setChecked(Array(randomStudentNames.length).fill(true));
    }
  };

  // TODO: fix student ids selection
  const handleChange: (idx: number) => void = (idx: number) => {
    const newChecked = [...checked];
    newChecked[idx] = !checked[idx];
    setChecked(newChecked);
    selectedStudentsIds.push(idx);
  };

  const { data, error, isLoading } = useGetStudentsByAccessCodeQuery({ accessCode });
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
          {data?.studentsPerAccessCode.map((_student, idx) => (
            <TableRow key={`${_student.newUser.firstName}-${idx}`}>
              <TableCell>
                <Typography variant="body2">{_student.newUser.firstName}</Typography>
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
                  navigate(
                    paths.teacher
                      .dashboard
                      .classes
                      .editClass
                      .editStudent
                      ._,
                    [_student.id]
                  );
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
            navigate(
              paths.teacher
                .dashboard
                .classes
                .editClass
                .releaseStudents
                ._,
              selectedStudentsIds
            );
          }}
        >Release</Button>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => {
            navigate(
              paths.teacher
                .dashboard
                .classes
                .editClass
                .moveStudents
                ._,
              selectedStudentsIds
            );
          }}
        >Move</Button>
        <Button
          disabled={!checked.includes(true)}
          onClick={() => {
            navigate(
              paths.teacher
                .dashboard
                .classes
                .editClass
                .resetStudents
                ._,
              selectedStudentsIds
            );
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

const DebugComponent: React.FC<any> = ({ accessCode }) => {
  const { data, isLoading, error } = useGetStudentsByAccessCodeQuery({ accessCode });
  return (
    <div>
      <code>
        {
          !isLoading
            ? (error ? JSON.stringify(error, null, 2) : JSON.stringify(data))
            : null
        }

      </code>
    </div>
  );
};

const EditClass: React.FC<{
  accessCode: string;
}> = ({ accessCode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = fromSearchParams();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      view: yup.string()
        .oneOf([
          'additional',
          'edit',
          'release',
          'move',
          'reset'
        ] as const)
    })
  );

  function goBack(): void {
    navigate(generatePath(
      paths.teacher.dashboard.classes.editClass._,
      { accessCode }
    ));
  }

  if (params?.view === 'additional') {
    return <AdditionalSettings
      accessCode={accessCode}
      goBack={goBack}
    />;
  }

  if (params?.view !== undefined && [
    'edit',
    'release',
    'move',
    'reset'
  ].includes(params.view)) {
    let studentIdsSchema = yup.array()
      .transform((csv: string) => csv.split(',')
        .filter(value => value !== '')
        .map(Number)
      )
      .of(yup.number().required())
      .min(1)
      .required();

    if (params.view === 'edit') {
      studentIdsSchema = studentIdsSchema.max(1);
    }

    const studentIds = tryValidateSync(
      searchParams,
      yup.object({ studentIds: studentIdsSchema }),
      {
        onError: () => {
          React.useEffect(() => {
            navigate(paths.error.pageNotFound._);
          }, []);
        }
      }
    )?.studentIds;

    if (studentIds !== undefined) {
      switch (params.view) {
        case 'edit':
          return <EditStudent
            accessCode={accessCode}
            studentId={studentIds[0]}
            goBack={goBack}
          />;
        case 'release':
          return <ReleaseStudent
            accessCode={accessCode}
            studentIds={studentIds}
            goBack={goBack}
          />;
        case 'move':
          return <MoveStudent
            currentAccessCode={accessCode}
            studentIds={studentIds}
            goBack={goBack}
          />;
        case 'reset':
          return <ResetStudent
            accessCode={accessCode}
            studentIds={studentIds}
            goBack={goBack}
          />;
      }
    }
  }
  return <>
    {location.state?.message &&
      <Page.Notification>
        {location.state.message}
      </Page.Notification>
    }
    <Page.Section>
      <Typography variant="h4" align="center">
        Update details for Class 1 ({accessCode})
      </Typography>
      <Link className='back-to' onClick={() => {
        navigate(paths.teacher.dashboard.classes._);
      }}>
        Classes
      </Link>
      <Typography mb={0}>
        Here you can view and manage all of your students within this class.
        You can add new students, transfer existing students to another one of
        your classes or to another teacher within your school or club, or
        remove students altogether.
      </Typography>
      <DebugComponent accessCode={accessCode} />
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
        <StudentsTable accessCode={accessCode} />
      </Box>
    </Page.Section>
    <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
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
            onClick={() => {
              navigate(generatePath(
                paths.teacher.dashboard.classes.editClass.additional._,
                { accessCode }
              ));
            }}
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
