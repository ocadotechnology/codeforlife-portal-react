import React from 'react';
import {
  Link
} from '@mui/material';

import { ImageProps } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import KirstyImage from '../../images/kirsty.png';
import NigelImage from '../../images/nigel.png';
import DeeImage from '../../images/dee.png';
import PhilImage from '../../images/phil.png';

export default interface ErrorProps {
  header: string;
  subheader: string;
  body: string | React.ReactElement;
  imageProps: ImageProps;
};

export function forbidden403(): ErrorProps {
  return {
    header: 'Oi!',
    subheader: 'Kirsty says you\'re not allowed there.',
    body: 'Those pages belong to Kirsty. She won\'t let you in even if you ask nicely.',
    imageProps: { alt: 'kirsty', src: KirstyImage }
  };
}

export function pageNotFound404(): ErrorProps {
  return {
    header: 'Uh oh!',
    subheader: 'Sorry, Nigel can\'t find the page you were looking for.',
    body: 'This might be because you have entered a web address incorrectly or the page has moved.',
    imageProps: { alt: 'nigel', src: NigelImage }
  };
}

export function tooManyRequests429(
  userType: 'teacher' | 'independent'
): ErrorProps {
  const resetPasswordHref = (userType === 'teacher')
    ? paths.resetPassword.teacher._
    : paths.resetPassword.independent._;

  return {
    header: 'Temporary lock out!',
    subheader: 'Your account has been temporarily blocked as there were too many unsuccessful requests.',
    body: <>If you wish to proceed, please <Link href={resetPasswordHref} className='body'>reset your password</Link>. Alternatively, you will need to wait 24 hours for your account to be unlocked again.</>,
    imageProps: { alt: 'phil', src: PhilImage }
  };
}

export function internalServerError500(): ErrorProps {
  return {
    header: 'Zap!',
    subheader: 'Oh dear! Something technical has gone wrong.',
    body: 'Dee will attempt to fix this soon.',
    imageProps: { alt: 'dee', src: DeeImage }
  };
}
