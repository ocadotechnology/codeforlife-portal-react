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
  Dialog,
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
import { useDeleteClassMutation, useGetStudentsByAccessCodeQuery } from '../../../../app/api';
import { studentPerAccessCode } from '../../../../app/api/teacher/teach';

const DeleteClassConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({
  open,
  onClose,
  onConfirm
}) => {
    const theme = useTheme();
    return (
      <Dialog open={open} onClose={onClose} maxWidth={'xs'}>
        <Typography variant='h5' textAlign='center'>
          Delete class
        </Typography>
        <Typography>
          This class will be permanently deleted. Are you sure?
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={theme.spacing(5)}>
          <Button
            variant='outlined'
            className='body'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Stack>
      </Dialog>
    );
  };

const StudentsTable: React.FC<{
  accessCode: string;
  studentData: studentPerAccessCode[];
}> = ({ accessCode, studentData }) => {
  const _navigate = useNavigate();

  function navigate(path: string, studentIds: number[]): void {
    _navigate(generatePath(
      path.replace('{studentIds}', studentIds.join(',')),
      { accessCode }
    ));
  }

  const [checked, setChecked] = React.useState<boolean[]>(
    Array(studentData.length).fill(false)
  );

  const handleSelectAllClick: () => void = () => {
    if (checked.includes(true)) {
      setChecked(Array(studentData.length).fill(false));
    } else {
      setChecked(Array(studentData.length).fill(true));
    }
  };

  const studentsIds = studentData.map((student) => student.id);
  const getSelectedStudentsIds: () => number[] = () => {
    const selectedIds: number[] = [];
    for (let i = 0; i < checked.length; i += 1) {
      if (checked[i]) {
        selectedIds.push(studentsIds[i]);
      }
    }
    return selectedIds;
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
          {studentData.map((student, idx) => (
            <TableRow key={`${student.id}`}>
              <TableCell>
                <Typography variant="body2">{student.newUser.firstName} {student.newUser.lastName}</Typography>
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
                  navigate(
                    paths.teacher
                      .dashboard
                      .classes
                      .editClass
                      .editStudent
                      ._,
                    [student.id]
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
              getSelectedStudentsIds()
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
              getSelectedStudentsIds()
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
              getSelectedStudentsIds()
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

const EditClass: React.FC<{
  accessCode: string;
}> = ({ accessCode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = fromSearchParams();
  const { data } = useGetStudentsByAccessCodeQuery({ accessCode });
  const studentData = data?.studentsPerAccessCode;

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

  const [dialog, setDialog] = React.useState<{
    open: boolean;
    onConfirm?: () => void;
  }>({ open: false });

  const [deleteClass] = useDeleteClassMutation();

  const classHasStudents = studentData?.length;
  const onDeleteClass = (): void => {
    setDialog({
      open: true,
      onConfirm: () => {
        setDialog({ open: false });
        if (classHasStudents) {
          navigate('.', {
            state: {
              message: 'This class still has students, please remove or delete them all before deleting the class.'
            }
          });
          navigate(0);
        } else {
          deleteClass({ accessCode }).unwrap()
            .then(() => {
              navigate(paths.teacher.dashboard.classes._, {
                state: {
                  message: 'The class has been deleted successfully.'
                }
              });
            })
            .catch((err) => { console.error('DeleteClass error ', err); });
        }
      }
    });
  };

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
        {studentData && <StudentsTable accessCode={accessCode} studentData={studentData} />}
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
            onClick={onDeleteClass}
          >
            Delete class
          </Button>
        </Stack>
      </Stack>
      {dialog.onConfirm !== undefined &&
        <DeleteClassConfirmDialog
          open={dialog.open}
          onClose={() => { setDialog({ open: false }); }}
          onConfirm={dialog.onConfirm}
        />
      }
    </Page.Section>
  </>;
};

export default EditClass;
