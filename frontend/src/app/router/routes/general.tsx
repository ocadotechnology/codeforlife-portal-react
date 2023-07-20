import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../../../pages/home/Home';
import AboutUs from '../../../pages/aboutUs/AboutUs';
import CodingClubs from '../../../pages/codingClubs/CodingClubs';
import GetInvolved from '../../../pages/getInvolved/GetInvolved';
import Contribute from '../../../pages/contribute/Contribute';
import HomeLearning from '../../../pages/homeLearning/HomeLearning';
import PrivacyNotice from '../../../pages/privacyNotice/PrivacyNotice';
import TermsOfUse from '../../../pages/termsOfUse/TermsOfUse';
import CommunicationPreferences from '../../../pages/communicationPreferences/CommunicationPreferences';
import paths from '../paths';

const general = <>
  <Route
    path={paths._}
    element={<Home />}
  />
  <Route
    path={paths.aboutUs._}
    element={<AboutUs />}
  />
  <Route
    path={`${paths.privacyNotice._}/:tab`}
    element={<PrivacyNotice />}
  />
  <Route
    path={`${paths.termsOfUse._}/:tab`}
    element={<TermsOfUse />}
  />
  <Route
    path={paths.homeLearning._}
    element={<HomeLearning />}
  />
  <Route
    path={paths.getInvolved._}
    element={<GetInvolved />}
  />
  <Route
    path={paths.codingClubs._}
    element={<CodingClubs />}
  />
  <Route
    path={paths.communicationPreferences._}
    element={<CommunicationPreferences />}
  />
  <Route
    path={paths.contribute._}
    element={<Contribute />}
  />
</>;

export default general;
