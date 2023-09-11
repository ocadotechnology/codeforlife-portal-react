import React from 'react';
import { Stack, Typography } from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import KuronoLogoImage from '../../images/kurono_logo.svg';
import { useGetStudentKuronoGameDataQuery } from '../../app/api';

const GetKuronoGameData: React.FC = () => {
  const { data, isLoading } = useGetStudentKuronoGameDataQuery(null);

  if (isLoading) return <Typography variant="h4">Loading...</Typography>;
  else if (!data) {
    return (
      <Typography variant="h4">Error while loading your scores...</Typography>
    );
  }
  if (data.worksheetId === 0) {
    return (
      <>
        <Typography variant="h4">
          You do not have any Kurono games yet.
        </Typography>
        <video loop autoPlay muted width="100%">
          <source
            src={require('../../videos/aimmo_play_now_background_video.mp4')}
            type="video/mp4"
          />
        </video>
      </>
    );
  } else {
    return (
      <>
        <Typography>
          You are exploring Challenge {data.worksheetId} with your class!
        </Typography>
        <Image
          title="Kurono active game"
          alt="Kurono active game"
          src={data.worksheetImage}
          maxWidth="800px"
        />
      </>
    );
  }
};

const KuronoProgress: React.FC<{
  isDependent: boolean;
}> = ({ isDependent }) => {
  // TODO: fetch from api store.
  const challengeLevel = 1;

  return (
    <Stack spacing={3} alignItems="center">
      <Image alt={'kurono_logo'} src={KuronoLogoImage} maxWidth="300px" />
      <GetKuronoGameData />
    </Stack>
  );
};

export default KuronoProgress;
