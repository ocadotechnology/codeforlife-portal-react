import React, { useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  IconButton,
  Link,
  Stack,
  Theme,
  Typography,
  useTheme
} from '@mui/material';
import PageSection from 'components/PageSection';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { paths } from 'app/router';

const Message: React.FC<{
  isStudent: boolean,
  theme: Theme,
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>,
}> = ({ isStudent, theme, setShowMessage }) => {
  const classCode = 'ABCDE'; // TODO: fetch from login details

  const onClickCloseIcon = (): void => {
    setShowMessage(false);
  };

  return (
    <PageSection
      bgcolor={isStudent ? '#08bafc' : theme.palette.tertiary.main}
      py={false}
    >
      <Grid container xs={12}>
        <Grid xs={1} maxWidth={25} className='flex-center-y' marginX={2}>
          <InfoOutlinedIcon color={isStudent ? 'white' : 'black'} />
        </Grid>
        <Grid xs>
          <Typography
            fontWeight={600}
            color={isStudent ? 'White' : 'black'}
            marginY={2}
          >
            {
              isStudent
                ? <>You are logged in to class: {classCode}</>
                // TODO: change href to join page
                : <>You are logged in as an independent student. If you want to join a school, you need to <Link href={paths.home} color="inherit" underline="always" >request to join one</Link>.</>
            }
          </Typography>
        </Grid>
        <Grid maxWidth={25} className='flex-center-y'>
          <IconButton onClick={onClickCloseIcon} color={isStudent ? 'white' : 'black'}>
            <CloseOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </PageSection>
  );
};

const Banner: React.FC<{
  isStudent: boolean,
  name: string
}> = ({ isStudent, name }) => {
  const theme = useTheme();
  const [showMessage, setShowMessage] = useState(true);

  return (
    <>
      <PageSection
        bgcolor={isStudent ? theme.palette.secondary.main : '#f6be00'}
        py={false}
      >
        <Stack
          alignItems='center'
          py={{ xs: 8, md: 16 }}
        >
          <Typography variant='h2' color={isStudent ? 'White' : 'black'}>
            Welcome, {name}
          </Typography>
          <Typography variant='h4' color={isStudent ? 'White' : 'black'}>
            This is where you can access your games
          </Typography>
        </Stack>
      </PageSection>

      {showMessage &&
        <Message
          isStudent={isStudent}
          theme={theme}
          setShowMessage={setShowMessage}
        />
      }
    </>
  );
};

export default Banner;
