import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Grid, Link, Typography, Stack, useTheme } from '@mui/material';
import { paths } from '../../../../../../app/router';
import { EmailField, Form, SubmitButton } from 'codeforlife/lib/esm/components/form';
import StudentNameField from '../../../../../../components/form/StudentNameField';
import { PersonRemoveAlt1Outlined } from '@mui/icons-material';

const ReleaseStudentsForm: React.FC<{
  studentNames: string[],
  goBack: () => void
}> = ({ studentNames, goBack }) => {
  const theme = useTheme();
  const initialValues: Record<string, string> = Object.fromEntries(
    studentNames.map((name, index) => { return [String(index), name]; })
  );
  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: call backend
        console.log(values);
        setSubmitting(false);
      }}
    >
      <Grid container columnSpacing={4}>
        {studentNames.map((studentName, index) => (
          <>
            <Grid item xs={12} sm={6}>
              <StudentNameField
                name={`original${String(index)}`}
                helperText='Original student name'
                readOnly={true}
                style={{ backgroundColor: theme.palette.info.main }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StudentNameField name={String(index)} />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ sm: 4 }} sx={{ marginBottom: '30px' }}>
                <EmailField
                  name={(index === undefined) ? 'email' : `email${index}`}
                  placeholder="Enter email address"
                  helperText="New email address"
                  required
                  repeat={[
                    {
                      name: 'confirmEmail',
                      placeholder: 'Confirm email address',
                      helperText: 'Confirm email address'
                    }
                  ]}
                />
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
      <Stack direction='row' spacing={2} justifyContent='end'>
        <Button
          variant='outlined'
          onClick={goBack}
        >
          Cancel
        </Button>
        <SubmitButton
          className="alert"
          endIcon={<PersonRemoveAlt1Outlined />}
        >
          Remove student(s)
        </SubmitButton>
      </Stack>
    </Form>
  );
};

const ReleaseStudent: React.FC<{
  accessCode: string;
  studentIds: number[];
  goBack: () => void;
}> = ({
  accessCode,
  studentIds,
  goBack
}) => {
    const navigate = useNavigate();

    // TODO: Get data from backend using params
    const studentNames = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];

    return <>
      <Page.Section>
        <Typography align='center' variant='h4'>
          Release student from class Class 1 ({accessCode})
        </Typography>
        <Link className='back-to' onClick={goBack}>
          Class
        </Link>
        <Typography mb={0}>
          Convert students into independent students.
        </Typography>
      </Page.Section>
      <Page.Section>
        <Typography variant='h5'>
          Students to release from school
        </Typography>
        <Typography>
          You are about to remove students from your class and set them up as independent students. Neither you nor your
          school will be able to manage them once you have submitted this request.
        </Typography>
        <Typography>
          Email addresses are required for independent student accounts. If a student is too young to own an email
          address, a parent or guardian&apos;s email address will be required.
        </Typography>
        <Typography>
          The email address will have to be validated through a verification email before the student can log in. The
          email has to be unique and not used for other accounts in Code for Life. <strong>Make sure you type the correct email,
            as otherwise we may not be able to recover the account</strong>.
        </Typography>
        <Typography>
          The students will then log in with their email via the <Link className='body' onClick={() => { navigate(paths.login.independent._); }}>independent student login</Link>.
          Their passwords will stay the same. Independent students do not need to provide a class access code.
        </Typography>
        <ReleaseStudentsForm
          studentNames={studentNames}
          goBack={goBack}
        />
      </Page.Section >
    </>;
  };

export default ReleaseStudent;
