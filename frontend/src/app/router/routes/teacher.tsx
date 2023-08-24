import React from 'react';
import { Route } from 'react-router-dom';
import paths from '../paths';
import Teacher from '../../../pages/teacher/Teacher';
import TeacherOnboarding from '../../../pages/teacherOnboarding/TeacherOnboarding';
import TeacherDashboard from '../../../pages/teacherDashboard/TeacherDashboard';

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
</>;

export default teacher;
