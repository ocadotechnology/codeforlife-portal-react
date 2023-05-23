import React from 'react';
import {
  Button,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { paths } from '../../app/router';
import TeacherSection from './TeacherSection';

const Resources: React.FC = () => {
  return (
    <TeacherSection
      videoSource={process.env.REACT_APP_TEACHER_RESOURCES_YOUTUBE_VIDEO_SRC as string}
    >
      <Typography variant='h5'>
        Resources and progress tracking
      </Typography>
      <Typography>
        Once you&apos;ve registered your personal details and logged in, you&apos;ll be able to create your school or club, or join other teachers at your institution.
      </Typography>
      <Typography>
        You can sign up your class, download free teaching packs, including sessions plans, pupil resources and assessment tools and track pupils&apos; progress. There are even videos to help you and your class understand what you&apos;ll be learning next.
      </Typography>
      <Button
        endIcon={<ChevronRightIcon />}
        style={{
          marginTop: 'auto'
        }}
        href={paths.register}
      >
        Register now
      </Button>
    </TeacherSection>
  );
};

export default Resources;
