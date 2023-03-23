import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Tabs,
  Tab,
  Typography,
  useTheme
} from '@mui/material';

const TabBar: React.FC<{
  title: string
  tabs: Array<{ label: string, element: React.ReactElement }>
}> = ({ title, tabs }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  return (
    <Grid container>
      <Grid
        xs={12}
        py={10}
        bgcolor={theme.palette.primary.main}
      >
        <Typography
          textAlign='center'
          variant='h2'
          style={{ color: 'white' }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid
        xs={12}
        py={1}
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
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Grid>
      <Grid
        xs={12}
        md={10} mdOffset={1}
        lg={8} lgOffset={2}
      >
        {tabs[value].element}
      </Grid>
    </Grid >
  );
};

export default TabBar;
