import React from 'react';
import { Route } from 'react-router-dom';

import Student from '../../../pages/student/Student';
import StudentDashboard from '../../../pages/studentDashboard/StudentDashboard';
import paths from '../paths';

const student = <>
  <Route
    path={paths.student._}
    element={<Student />}
  />
  <Route
    path={`${paths.student.dashboard._}/:type/:view?`}
    element={<StudentDashboard />}
  />
</>;

export default student;
