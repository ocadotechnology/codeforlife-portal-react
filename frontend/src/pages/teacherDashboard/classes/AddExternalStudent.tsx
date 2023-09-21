import React from 'react';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import {
  Form,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Link,
  useTheme,
  Button
} from '@mui/material';
import { paths } from '../../../app/router';
import { StudentRequestData, useAcceptStudentRequestMutation, useGetStudentRequestDataQuery } from '../../../app/api/teacher/dashboardClasses';

const CurrentStudentsList: React.FC<{
  students: string[];
}> = ({ students }) => {
  return (
    <>
      <Typography variant="h6">
        Student Name
      </Typography>
      {students.map((name, keyIdx) => (
        <Typography key={keyIdx} variant="subtitle1">
          {name}
        </Typography>
      ))}
    </>
  );
};

const StudentsCurrentlyInClass: React.FC<{
  data: StudentRequestData;
}> = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack sx={{ height: '100%' }} margin={theme.spacing(3)}>
      <Typography variant="h4">Students currently in class</Typography>
      {data.students.length
        ? <>
          <Typography mb={theme.spacing(5)}>
            {data.student.studentUsername}, the new external student, will be joining students in the class {data.student.className} ({data.student.classAccessCode})
          </Typography>
          <CurrentStudentsList students={data.students} />
        </>
        : <Typography>
          The new external student {data.student.studentUsername} is joining the class {data.student.className} ({data.student.classAccessCode}) in which there are currently no other students.
        </Typography>
      }
    </Stack>
  );
};

const AddExternalStudentForm: React.FC<{
  studentId: number;
}> = ({ studentId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const initialValues = {
    name: ''
  };
  const [acceptStudentRequest] = useAcceptStudentRequestMutation();

  const onSubmitStudentName = (value: { name: string }): void => {
    acceptStudentRequest({ studentId, name: value.name }).unwrap()
      .then(() => {
        // TODO: redirect to teacher_added_external_student.html
        console.log('acceptStudentRequest');
      })
      .catch((err) => {
        console.error('AcceptStudentRequest error', err);
        navigate('.', {
          state: {
            notifications: [
              { index: 0, props: { children: err.data.error } }
            ]
          }
        });
      });
  };

  return (
    <Stack sx={{ height: '100%' }} margin={theme.spacing(3)}>
      <Typography variant="h4">Add external student</Typography>
      <Typography>
        Please confirm the name of the new external student joining your class. Their name will be used in their new login details, so please ensure it is different from any other existing student in the class.
      </Typography>
      <Typography mt={theme.spacing(3)}>
        Student name
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          onSubmitStudentName(values);
        }}
      >
        <TextField
          name="name"
          placeholder="Name"
        />
        <Typography sx={{ fontStyle: 'italic', color: '#d60026' }} mt={theme.spacing(1)}>
          This field is required.
        </Typography>
        <Stack direction="row" spacing={5} justifyContent={'center'} marginY={theme.spacing(3)}>
          <Button
            variant='outlined'
            onClick={() => { navigate(-1); }}
          >
            Cancel
          </Button>
          <SubmitButton>Save</SubmitButton>
        </Stack>
      </Form>
    </Stack>
  );
};

const AddExternalStudent: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const studentId = tryValidateSync(
    useParams(),
    yup.object({
      studentId: yup.number().required()
    })
  )?.studentId as number;
  const { data, error, isLoading } = useGetStudentRequestDataQuery({ studentId });

  return <>
    {error
      ? (<> There was an error</>)
      : (!isLoading && data)
        ? (
          <Page.Container>
            <Page.Section>
              <Typography variant="h4" align="center" mb={0}>
                Add external student to class {data.student.className} ({data.student.classAccessCode})
              </Typography>
            </Page.Section>
            <Page.Section>
              <Grid
                container
                spacing={{ xs: 2, lg: 3 }}
                display="flex"
              >
                <Grid xs={12} md={6}>
                  <StudentsCurrentlyInClass data={data} />
                </Grid>
                <Grid xs={12} md={6} bgcolor={theme.palette.info.main}>
                  <AddExternalStudentForm studentId={studentId} />
                </Grid>
              </Grid>

              <Grid xs={12} md={6} marginTop={theme.spacing(7)}>
                <Link className='back-to' onClick={() => {
                  navigate(paths.teacher.dashboard.classes._);
                }}>
                  Class
                </Link>
              </Grid>
            </Page.Section>
          </Page.Container>
        )
        : null
    }
  </>;
};

export default AddExternalStudent;
