import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Timer: React.FC<{
  delaySecond: number,
}> = ({ delaySecond }) => {
  const [delay, setDelay] = useState(+delaySecond);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Typography variant='h5' textAlign='center'>
      {minutes} min {seconds} secs
    </Typography>
  );
};

export default Timer;
