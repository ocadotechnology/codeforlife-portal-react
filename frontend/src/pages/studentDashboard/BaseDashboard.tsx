import React from 'react';
import {
  useTheme,
  Link
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import Games from './Games';
import RapidRouterProgress from './RapidRouterProgress';
import KuronoProgress from './KuronoProgress';
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import { SectionProps as PageSectionProps } from 'codeforlife/lib/esm/components/page/Section';
import StudentAccount from './account/StudentAccount';
import JoinSchool from './joinSchool/JoinSchool';
import Characters from '../../features/characters/Characters';
import { paths } from '../../app/routes';
import { useNavigate } from 'react-router-dom';

export interface BaseDashboardProps {
  isDependent: boolean;
}

const BaseDashboard: React.FC<BaseDashboardProps> = ({
  isDependent
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const viewOptions = ['account', 'join'] as const;

  const params = SearchParams.get<{
    view?: typeof viewOptions[number];
  }>({
    view: {
      isRequired: false,
      validate: SearchParams.validate.inOptions(viewOptions)
    }
  });

  // TODO: get from api store.
  const name = 'John';
  const classCode = 1;

  const [view, setView] = React.useState(params?.view);

  let pageView: React.ReactElement<PageSectionProps, typeof Page.Section>;

  React.useEffect(() => {
    if (view === 'join' && isDependent) {
      navigate(paths.error.forbidden._);
    }
  }, [view]);

  switch (view) {
    case 'account':
      pageView = <StudentAccount isDependent={isDependent} goBack={() => { setView(undefined); }}/>;
      break;
    case 'join':
      pageView = <JoinSchool goBack={() => { setView(undefined); }}/>;
      break;
    default:
      pageView = <></>;
  }

  return <>
    <Page.Banner
      header={`Welcome, ${name}`}
      subheader={(view === undefined) ? 'This is where you can access your games' : ''}
      textAlign='center'
      bgcolor={isDependent ? 'tertiary' : 'secondary'}
    />
    {view !== undefined
      ? <>{ pageView }</>
      : <>
        <Page.Notification bgcolor={isDependent ? 'tertiary' : 'secondary'}>
          {isDependent
            ? <>You are logged in to class: {classCode}</>
            : <>
              You are logged in as an independent student.
              If you want to join a school, you need to&nbsp;
              <Link onClick={() => { setView('join'); }} color="inherit">
                request to join one
              </Link>
              .
            </>
          }
        </Page.Notification>
        <Page.Section>
          <Games isDependent={isDependent} />
        </Page.Section>
        <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
          <RapidRouterProgress isDependent={isDependent} />
        </Page.Section>
        <Page.Section>
          <KuronoProgress isDependent={isDependent} />
        </Page.Section>
        {!isDependent
        ? <>
          <Page.Section gridProps={{ bgcolor: theme.palette.info.main }} >
            <Characters game='kurono' />
          </Page.Section>
        </>
        : <></>
        }
      </>
    }
  </>;
};

export default BaseDashboard;
