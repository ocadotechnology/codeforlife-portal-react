import React from 'react';
import {
  Tabs,
  Tab,
  Typography,
  useTheme
} from '@mui/material';

import PageSection from './PageSection';

const PageTabBar: React.FC<{
  title: string
  tabs: Array<{ label: string, element: React.ReactElement }>
}> = ({ title, tabs }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
        TabIndicatorProps={{
          style: { display: 'none' }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            style={{
              marginRight: index !== tabs.length - 1 ? 30 : 0,
              textTransform: 'none',
              fontSize: theme.typography.body2.fontSize
            }}
          />
        ))}
      </Tabs>
    </PageSection>
    <PageSection>
      {tabs[value].element}
    </PageSection>
  </>;
};

export default PageTabBar;
