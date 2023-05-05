import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';

const Quotes: React.FC = () => {
  const quoteStyle = {
    color: '#e0004d',
    fontSize: 22,
    fontFamily: 'SpaceGrotesk',
    fontWeight: '500',
    lineHeight: '1.8rem'
  };

  return <>
    <Grid container spacing={1} padding={3}>
      <Grid xs={12} mb={4}>
        <Typography variant='h4' textAlign='center'>
          Code for Life and Ocado Group
        </Typography>
      </Grid>
      <Grid container xs={12} p={3} spacing={4}>
        <Grid xs={12} md={6}>
          <Typography style={quoteStyle}>
            “We were delighted computing entered the UK curriculum in 2014. However, many teachers felt unprepared. And the lack of diversity in people studying STEM concerned us. So, we sought to make the subject appeal to a broader group of both students and teachers.”
          </Typography>
          <Typography>
            Anne Marie Neatham, Commercial Director and COO Kindred, Ocado Group.
          </Typography>
        </Grid>
        <Grid xs={12} md={6} >
          <Typography>
            With that in mind, CFL was developed by volunteers and interns from Ocado Technology - the technology arm of Ocado Group - and teacher Sharon Harrison, who created the Rapid Router learning materials. Anne Marie continues:
          </Typography>
          <Typography style={quoteStyle}>
            “I&apos;m proud this initiative has been breaking down stereotypes. Children are seeing that you don&apos;t have to fit a certain gender, race or personality type to get coding.”
          </Typography>
          <Typography>
            Today, CFL is operated by a small core team and volunteers.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </>;
};

export default Quotes;
