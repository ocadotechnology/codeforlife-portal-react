import React, { useEffect } from 'react';
import {
  Button,
  Stack,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Image } from 'codeforlife/lib/esm/components';
import RRLogoImage from '../../images/RR_logo.svg';
import { paths } from '../../app/router';
import { useGetStudentScoreQuery } from '../../app/api';


const GetScores = () => {
  const { data, error, isLoading } = useGetStudentScoreQuery(null);

  if (isLoading) return <Typography variant='h4'>Loading...</Typography>
  else if (!data) return <Typography variant='h4'>Error while loading your scores...</Typography>

  return (
    <>
      <Typography variant='h4'>
        You have completed {data.numCompleted} Rapid Router levels!
      </Typography>
      <Typography variant='h4'>
        You have {data.numTopScores} top scores!
      </Typography>
      <Typography variant='h4'>
        You have a score of {data.totalScore}. There are {data.totalAvailableScore} available points.
      </Typography>
    </>
  )
}


const RapidRouterProgress: React.FC<{
  isDependent: boolean
}> = ({ isDependent }) => {

  return (
    <Stack
      alignItems='center'
      textAlign='center'
    >
      <Image
        alt={'RR_logo'}
        src={RRLogoImage}
        maxWidth='200px'
      />
      <GetScores />
      {isDependent &&
        <Button
          style={{ marginTop: 20 }}
          endIcon={<ChevronRightIcon />}
          href={paths.rapidRouter._}
        >
          Check scoreboard
        </Button>
      }
    </Stack>
  );
};

export default RapidRouterProgress;
