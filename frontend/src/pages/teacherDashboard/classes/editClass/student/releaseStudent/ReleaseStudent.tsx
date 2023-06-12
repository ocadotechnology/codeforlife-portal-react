import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Grid, Link, Stack, Typography } from '@mui/material';
import { paths } from '../../../../../../app/router';
import { EmailField, Form, TextField } from 'codeforlife/lib/esm/components/form';
import StudentNameField from '../../../../../../components/form/StudentNameField';
import { PersonRemoveAlt1Outlined } from '@mui/icons-material';

const ReleaseStudentsForm: React.FC<{
  studentNames: string[],
  goBack: () => void
}> = ({ studentNames, goBack }) => {
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
            <Grid item sm={6}>
              {/* TODO: Check with Laura about look of read-only vs disabled - both seem not great */}
              <TextField
                name={String(index)}
                helperText="Original student name"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <StudentNameField name={String(index)}/>
            </Grid>
            <Grid item sm={6}>
              <EmailField
                required
                placeholder="Enter email address"
                helperText="New email address"
              />
            </Grid>
            {/* TODO: Replace with proper margin */}
            <Grid item sm={6} sx={{ mb: '40px' }}>
              <EmailField
                required
                placeholder="Confirm email address"
                helperText="Confirm email address"
              />
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
        <Button
          className="alert"
          type='submit'
          endIcon={<PersonRemoveAlt1Outlined />}
        >
          Remove student(s)
        </Button>
      </Stack>
    </Form>
  );
};

const ReleaseStudent: React.FC<{
  className: string;
  accessCode: string;
  goBack: () => void;
}> = ({
  className,
  accessCode,
  goBack
}) => {
  // TODO: Get data from backend (or from previous page state)
  const studentNames = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];
  return (
    <Page.Section>
      <Typography align='center' variant='h4'>
        Release student from class {className} ({accessCode})
      </Typography>
      <Link className='back-to' onClick={goBack}>
        Class
      </Link>
      <Typography>
        Convert students into independent students.
      </Typography>
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
        The students will then log in with their email via the <a href={paths.login.independent._}>independent student login</a>. Their passwords will stay
        the same. Independent students do not need to provide a class access code.
      </Typography>
      <ReleaseStudentsForm
        studentNames={studentNames}
        goBack={goBack}
      />
    </Page.Section>
  );
};

export default ReleaseStudent;
