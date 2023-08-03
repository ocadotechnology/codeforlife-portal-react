import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';

const Statistic: React.FC<{
  number: string
  description: string
}> = ({ number, description }) => (
  <Stack>
    <Typography
      variant='h2'
      sx={{ color: (theme) => theme.palette.tertiary.main }}
    >
      {number}
    </Typography>
    <Typography mb={0}>
      {description}
    </Typography>
  </Stack>
);

const Statistics: React.FC = () => {
  return <>
    <Stack textAlign='center'>
      <Typography variant='h4'>
        Code For Life is a non profit initiative that delivers free, open-source games that help all students learn computing.
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
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
      </Stack>
    </Stack >
  </>;
};

export default Statistics;
