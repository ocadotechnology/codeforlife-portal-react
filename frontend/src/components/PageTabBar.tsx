import React from 'react';
import {
  Tabs,
  Tab,
  Typography,
  useTheme
} from '@mui/material';

import PageSection from './PageSection';

import {
  getSearchParams,
  valueInOptions
} from 'codeforlife/lib/esm/helpers';

const PageTabBar: React.FC<{
  title: string
  tabs: Array<{ label: string, element: React.ReactElement }>
}> = ({ title, tabs }) => {
  const theme = useTheme();

  const labels = tabs.map(tab => tab.label);
  const params = getSearchParams<{ tab: string }>({
    tab: { validate: valueInOptions(labels) }
  });

  const [value, setValue] = React.useState(
    params === null ? 0 : labels.indexOf(params.tab)
  );

  return <>
    <PageSection
      bgcolor={theme.palette.primary.main}
      className='flex-center'
      py={false}
    >
      <Typography
        textAlign='center'
        variant='h2'
        style={{
          color: 'white',
          margin: '100px 0px'
        }}
      >
        {title}
      </Typography>
    </PageSection>
    <PageSection
      bgcolor={theme.palette.primary.light}
      className='flex-center'
    >
      <Tabs
        value={value}
        onChange={(_, value) => { setValue(value); }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
    </PageSection>
    <PageSection>
      {tabs[value].element}
    </PageSection>
  </>;
};

export default PageTabBar;
