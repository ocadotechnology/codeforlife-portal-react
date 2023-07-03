import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import Page, {
  SectionProps as PageSectionProps
} from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import { paths } from '../../app/router';
import BaseDashboard from './BaseDashboard';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      type: yup.string()
        .oneOf([
          'dependent',
          'independent'
        ] as const)
        .required()
    }),
    {
      onError: () => {
        React.useEffect(() => {
          navigate(paths.error.pageNotFound._);
        }, []);
      }
    }
  );

  let dashboard: React.ReactElement<PageSectionProps, typeof Page.Section> = <></>;
  switch (params?.type) {
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

export default StudentDashboard;
