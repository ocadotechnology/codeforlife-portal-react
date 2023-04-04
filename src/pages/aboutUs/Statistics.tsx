import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography
} from '@mui/material';

const Statistic: React.FC<{
  number: string
  description: string
}> = ({ number, description }) => (
  <Grid xs={12} md={4}>
    <Stack>
      <Typography
        variant='h3'
        style={{ color: '#00a3e0' }}
        textAlign='center'
      >
        {number}
      </Typography>
      <Typography textAlign='center'>
        {description}
      </Typography>
    </Stack>
  </Grid>
);

const Statistics: React.FC = () => {
  return <>
    <Grid container padding={3}>
      <Grid xs={12} textAlign='center'>
        <Typography variant='h5'>
          Code For Life is a non profit initiative that delivers free, open-source games that help all students learn computing.
        </Typography>
      </Grid>
      <Grid
        container
        display='flex'
        justifyContent='center'
        spacing={1}
        mt={3}
      >
        <Statistic
          number='2014'
          description='The year that computing was added to the UK curriculum. We&apos;ve been supporting teachers and students ever since.'
        />
        <Statistic
          number='>160'
          description='Countries are taking part, with the UK, the USA, Brazil, Australia and Canada as top locations for schools signed up to CFL. Nearly 10,000 schools are registered globally.'
        />
        <Statistic
          number='>270,000'
          description='Active users so far, with numbers growing every day. In 2020 alone, close to 100,000 new people subscribed to our resources.'
        />
      </Grid>
    </Grid >
  </>;
};

export default Statistics;
