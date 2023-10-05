import React from 'react';
import { Route } from 'react-router-dom';
import paths from '../paths';
import Teacher from '../../../pages/teacher/Teacher';
import TeacherOnboarding from '../../../pages/teacherOnboarding/TeacherOnboarding';
import TeacherDashboard from '../../../pages/teacherDashboard/TeacherDashboard';
import AddExternalStudent from '../../../pages/teacherDashboard/classes/AddExternalStudent';
import AddedExternalStudent from '../../../pages/teacherDashboard/classes/AddedExternalStudent';
import UpdatedStudentCredentials from '../../../pages/teacherDashboard/classes/editClass/student/editStudent/UpdatedStudentCredentials';

const teacher = <>
  <Route
    path={paths.teacher._}
    element={<Teacher />}
  />
  <Route
    path={paths.teacher.onboarding._}
    element={<TeacherOnboarding />}
  />
  <Route
    path={paths.teacher.dashboard.school._}
    element={<TeacherDashboard tab={0} />}
  />
  <Route
    path={paths.teacher.dashboard.school.leave._}
    element={<TeacherDashboard tab={1} movingClass={true} />}
  />
  <Route
    path={`${paths.teacher.dashboard.classes._}/:accessCode?/:view?`}
    element={<TeacherDashboard tab={1} />}
  />
  <Route
    path={`${paths.teacher.dashboard.account._}/:view?`}
    element={<TeacherDashboard tab={2} />}
  />
  <Route
    path={paths.teacher.dashboard.student.accept._}
    element={<AddExternalStudent />}
  />
  <Route
    path={paths.teacher.dashboard.student.added._}
    element={<AddedExternalStudent />}
  />
  <Route
    path={`${paths.teacher.dashboard.classes._}/:accessCode/updated-student-credentials`}
    element={<UpdatedStudentCredentials />}
  />
</>;

export default teacher;
