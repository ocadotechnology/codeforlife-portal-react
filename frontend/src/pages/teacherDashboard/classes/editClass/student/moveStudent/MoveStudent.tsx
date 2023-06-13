import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Link, Stack, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material';
import { CflHorizontalForm } from '../../../../../../components/form/CflForm';
import { AutocompleteField, Form, SubmitButton } from 'codeforlife/lib/esm/components/form';
import { CflTableCellElement, TableRowStyled } from '../../../../../../components/CflTable';
import StudentNameField from '../../../../../../components/form/StudentNameField';

const SelectClassForm: React.FC<{
  setNewClassSelected: (newClassName: string) => void,
  goBack: () => void,
}> = ({ setNewClassSelected, goBack }) => {
  // TODO: Get data from backend and append teacher names (but don't pass them through to the next page or it will show up in the text and break the sentence grammar.)
  const classNames = ['Class 2 (CL124)', 'Class 3 (CL125)'];

  interface Values {
    newClassName: string;
  }

  // TODO: Initial value should be student name
  const initialValues: Values = {
    newClassName: ''
  };
  return (
    <CflHorizontalForm
      header='Select destination class'
      subheader='Choose a new class from the drop down menu for the student(s).'
      initialValues={initialValues}
      onSubmit={(values) => {
        setNewClassSelected(values.newClassName);
      }}
      submitButton={
        <SubmitButton>Continue</SubmitButton>
      }
      cancelButton={
        <Button
          variant='outlined'
          onClick={goBack}
        >
          Cancel
        </Button>
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
  studentNames: string[],
  goBack: () => void,
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
        <Button
          variant='outlined'
          onClick={goBack}
        >
          Cancel
        </Button>
        <Button type='submit'>
          Save
        </Button>
      </Stack>
    </Form>
  );
};

const MoveStudent: React.FC<{
  currentAccessCode: string;
  goBack: () => void;
}> = ({
  currentAccessCode,
  goBack
}) => {
  // TODO: Get data from backend
  const [newClassName, setNewClassSelected] = React.useState<string | undefined>(undefined);
  const studentNames = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];
  return (
    <Page.Section>
      <Typography align='center' variant='h4'>
        Move students from class Class 1 ({currentAccessCode})
      </Typography>
      <Link className='back-to' onClick={goBack}>
        Class
      </Link>
      {newClassName === undefined
        ? <>
            <Typography>
              Choose a class from the drop down menu below to move the student.
            </Typography>
            <SelectClassForm setNewClassSelected={setNewClassSelected} goBack={goBack}/>
          </>
        : <>
            <Typography variant='h5'>
              Students currently in destination class
            </Typography>
            <Typography>
              The following students are in class {newClassName} into which you are about to move students from class Class 1.
            </Typography>
            <StudentsTable/>
            <Typography variant='h5'>
              Students to transfer
            </Typography>
            <Typography>
              Please confirm the names of the following students being moved to class {newClassName} from
              class Class 1. Their names will be used in their new login details, so please ensure
              it is different from any other existing students in the class.
            </Typography>
            <MoveStudentsForm studentNames={studentNames} goBack={goBack}/>
          </>
        }
    </Page.Section>
  );
};

export default MoveStudent;
