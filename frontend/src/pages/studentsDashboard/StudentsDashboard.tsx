import React from 'react';
import { useNavigate } from 'react-router-dom';

import Page, {
  SectionProps as PageSectionProps
} from 'codeforlife/lib/esm/components/page';

import { paths } from '../../app/router';
import BaseDashboard from './BaseDashboard';

import { SearchParams } from 'codeforlife/lib/esm/helpers';

const StudentsDashboard: React.FC = () => {
  const navigate = useNavigate();

  const userTypes = ['dependent', 'independent'] as const;
  const params = SearchParams.get<{
    userType: typeof userTypes[number];
  }>({
    userType: { validate: SearchParams.validate.inOptions(userTypes) }
  });

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.error.internalServerError._);
    }
  }, []);

  if (params === null) return <></>;

  let dashboard: React.ReactElement<PageSectionProps, typeof Page.Section>;
  switch (params.userType) {
    case 'dependent':
      dashboard = <BaseDashboard isDependent={true} />;
      break;
    case 'independent':
      dashboard = <BaseDashboard isDependent={false} />;
      break;
  }

  return (
    <Page.Container>
      {dashboard}
    </Page.Container>
  );
};

export default StudentsDashboard;
