import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';

import { paths } from '../../app/router';
import PageSection from '../../components/PageSection';
import Characters from '../../features/characters/Characters';
import BasePage from '../BasePage';
import BaseDashboard from './BaseDashboard';

import { getSearchParams } from 'codeforlife/lib/esm/helpers';

enum UserType {
  dependent = 'dependent',
  independent = 'independent'
}

interface StudentsDashboardSearchParams {
  userType: UserType
}

const StudentsDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  let params = getSearchParams({
    userType: { cast: String }
  }) as StudentsDashboardSearchParams | null;

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;

  let dashboard: React.ReactElement;
  switch (params.userType) {
    case UserType.dependent:
      dashboard = <BaseDashboard isDependent={true} />;
      break;
    case UserType.independent:
      dashboard = <>
        <BaseDashboard isDependent={false} />
        <PageSection bgcolor={theme.palette.info.main} >
          <Characters game='kurono' />
        </PageSection>
      </>;
      break;
    default:
      params = null;
      return <></>;
  }

  return (
    <BasePage>
      {dashboard}
    </BasePage>
  );
};

export default StudentsDashboard;
