import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollRoutes } from 'codeforlife/lib/esm/components';

import Header from '../../features/header/Header';
import Footer from '../../features/footer/Footer';
import general from './routes/general';
import authentication from './routes/authentication';
import teacher from './routes/teacher';
import student from './routes/student';
import error from './routes/error';

const Router: React.FC = () => (
  <BrowserRouter>
    <Header />
    <ScrollRoutes>
      {general}
      {authentication}
      {teacher}
      {student}
      {error} {/* this must be last */}
    </ScrollRoutes>
    <Footer />
  </BrowserRouter>
);

export default Router;
