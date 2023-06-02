import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';

import { paths } from '../../app/router';
import PageSection from '../../components/PageSection';
import Characters from '../../features/characters/Characters';
import BasePage from '../BasePage';
import BaseDashboard from './BaseDashboard';

import { SearchParams } from 'codeforlife/lib/esm/helpers';

const StudentsDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const userTypes = ['dependent', 'independent'] as const;
  const params = SearchParams.get<{
    userType: typeof userTypes[number];
  }>({
    userType: { validate: SearchParams.validate.inOptions(userTypes) }
  });

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;

  let dashboard: React.ReactElement;
  switch (params.userType) {
    case 'dependent':
      dashboard = <BaseDashboard isDependent={true} />;
      break;
    case 'independent':
      dashboard = <>
        <BaseDashboard isDependent={false} />
        <PageSection bgcolor={theme.palette.info.main} >
          <Characters game='kurono' />
        </PageSection>
      </>;
      break;
  }

  return (
    <BasePage>
      {dashboard}
    </BasePage>
  );
};

export default StudentsDashboard;
