import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Link,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';
import TeacherSection from './TeacherSection';

const Kurono: React.FC = () => {
  const navigate = useNavigate();

  return (
    <TeacherSection
      videoSource={process.env.REACT_APP_KURONO_FOR_TEACHER_YOUTUBE_VIDEO_SRC as string}
    >
      <Typography variant='h4'>
        Kurono
      </Typography>
      <Typography>
        Kurono is our multiplayer game that is also aligned to the National Curriculum. It is aimed at Key stages 3 and 4 and concentrates on text-based programming using Python. Students follow a set of challenges that enable them to embed their skills by completing the exercises alongside their classmates.
      </Typography>
      <Typography>
        <Link
          href={process.env.REACT_APP_KURONO_AND_CURRICULUM}
          color="inherit"
          underline="always"
          target="_blank"
        >
          See how Kurono relates to Key Stages 3 & 4 of the computer science strand here.
          <OpenInNewIcon fontSize='small' />
        </Link>
      </Typography>
      <Button
        endIcon={<ChevronRightIcon />}
        style={{
          marginTop: 'auto'
        }}
        onClick={() => { navigate(paths.register._); }}
      >
        Register now
      </Button>
    </TeacherSection>
  );
};

export default Kurono;
