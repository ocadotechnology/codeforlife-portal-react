import React from 'react';
import {
  Typography
} from '@mui/material';

const HowLongWeKeepData: React.FC = () => <>
  <Typography>
    We’ll only retain your personal information for as long as you have an active account on Code for Life, unless we need to keep it for longer than this to help us defend a legal claim.
  </Typography>
  <Typography>
    Once you deactivate your account, we might keep an anonymous version of your information to help us with research and other business reasons like assessing how the business is performing and planning for the future.
  </Typography>
  <Typography mb={0}>
    For users that have registered but whose accounts are inactive, we’ll delete your personal information after 3 years of inactivity.
  </Typography>
</>;

export default HowLongWeKeepData;
