import React from 'react';
import BasePage from '../../../BasePage';
import DashboardBanner from '../../DashboardBanner';
import DashboardHeader from '../../DashboardHeader';
import {
  Button,
  Link,
  Typography,
  TableContainer,
  Table,
  TableHead, TableBody, Stack
} from '@mui/material';
import PageSection from '../../../../components/PageSection';
import { paths } from '../../../../app/router';
import { CflHorizontalForm } from '../../../../components/form/CflForm';
import { AutocompleteField, Form, SubmitButton } from 'codeforlife/lib/esm/components/form';
import { CflTableCellElement, TableRowStyled } from '../../../../components/CflTable';
import StudentNameField from '../../../../components/form/StudentNameField';

const SelectClassForm: React.FC<{
  setClassSelected: (className: string) => void
}> = ({ setClassSelected }) => {
  // TODO: Get data from backend and append teacher names (but don't pass them through to the next page or it will show up in the text and break the sentence grammar.)
  const classNames = ['Class1 (CL123)', 'Class2 (CL124)', 'Class3 (CL125)'];

  interface Values {
    className: string;
  }

  // TODO: Initial value should be student name
  const initialValues: Values = {
    className: ''
  };
  return (
    <CflHorizontalForm
      header='Select destination class'
      subheader='Choose a new class from the drop down menu for the student(s).'
      initialValues={initialValues}
      onSubmit={(values) => {
        setClassSelected(values.className);
      }}
      submitButton={
        <SubmitButton>Continue</SubmitButton>
      }
      // TODO: Add return to Edit class page
      cancelButton={
        <Button variant='outlined'>Cancel</Button>
      }
    >
      <AutocompleteField
        options={classNames}
        textFieldProps={{
          required: true,
          name: 'className',
          helperText: 'Choose class',
          placeholder: '(select class)'
        }}
      />
    </CflHorizontalForm>
  );
};

const StudentsTable: React.FC = () => {
  // TODO: Get data from backend
  const otherStudentNames = ['Other Student 1', 'Other Student 2', 'Other Student 3'];
  return (
    <TableContainer sx={{
      margin: 'auto',
      width: { md: 1 / 2 }
    }}
    >
      <Table>
        <TableHead>
          <TableRowStyled>
            <CflTableCellElement>
              Student name
            </CflTableCellElement>
          </TableRowStyled>
        </TableHead>
        <TableBody>
          {otherStudentNames.map((otherStudentName, index) => (
            <TableRowStyled key={index}>
              <CflTableCellElement>
                {otherStudentName}
              </CflTableCellElement>
            </TableRowStyled>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MoveStudentsForm: React.FC<{
  studentNames: string[]
}> = ({ studentNames }) => {
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRowStyled>
              <CflTableCellElement>
                Existing name
              </CflTableCellElement>
              <CflTableCellElement>
                New student name
              </CflTableCellElement>
            </TableRowStyled>
          </TableHead>
          <TableBody>
            {studentNames.map((studentName, index) => (
              <TableRowStyled key={index}>
                <CflTableCellElement>
                  {studentName}
                </CflTableCellElement>
                <CflTableCellElement>
                  <StudentNameField name={String(index)}/>
                </CflTableCellElement>
              </TableRowStyled>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction='row' spacing={2} justifyContent='end'>
        <Button variant='outlined'>
          Cancel
        </Button>
        <Button type='submit'>
          Save
        </Button>
      </Stack>
    </Form>
  );
};

const Move: React.FC = (): JSX.Element => {
  // TODO: Get data from backend
  const currentClassName = 'Awesome Class (AW123)';
  const [className, setClassSelected] = React.useState<string>('');
  const studentNames = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page='Your classes' />
      <PageSection>
        <Typography align='center' variant='h4'>
          {/* TODO: Plugin class data */}
          Move students from class {currentClassName}
        </Typography>
        {/* TODO: Update path */}
        <Link href={paths.teacher.dashboard.classes._} color='inherit' className='body'>
          &lt; Back to Edit class
        </Link>
        {className === ''
          ? <>
              <Typography>
                Choose a class from the drop down menu below to move the student.
              </Typography>
              <SelectClassForm setClassSelected={setClassSelected} />
            </>
          : <>
              <Typography variant='h5'>
                Students currently in destination class
              </Typography>
              <Typography>
                The following students are in class {className} into which you are about to move students from class {currentClassName}.
              </Typography>
              <StudentsTable/>
              <Typography variant='h5'>
                Students to transfer
              </Typography>
              <Typography>
                Please confirm the names of the following students being moved to class {className} from
                class {currentClassName}. Their names will be used in their new login details, so please ensure
                it is different from any other existing students in the class.
              </Typography>
              <MoveStudentsForm studentNames={studentNames}/>
            </>
          }
      </PageSection>
    </BasePage>
  );
};

export default Move;
