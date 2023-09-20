import React from 'react';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import Page from 'codeforlife/lib/esm/components/page';

const AddExternalStudent: React.FC = () => {
  const studentId = tryValidateSync(
    useParams(),
    yup.object({
      studentId: yup.string().required()
    })
  )?.studentId;

  // acceptStudentRequest({ studentId }).unwrap()
  //   .then(() => { console.log('acceptStudentRequest'); })
  //   .catch((err) => { console.error('AcceptStudentRequest error', err); });

  return (
    <Page.Section>
      <>AddExternalStudent {studentId}</>
    </Page.Section>
  );
};

export default AddExternalStudent;
