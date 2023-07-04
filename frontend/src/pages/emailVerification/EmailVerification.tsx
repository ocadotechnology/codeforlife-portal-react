import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { fromSearchParams } from 'codeforlife/lib/esm/helpers/router';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import SadFaceImg from '../../images/sadface.png';
import PaperPlaneImg from '../../images/paper_plane.png';
import { paths } from '../../app/router';
import Status from './Status';

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      userType: yup.string()
        .oneOf([
          'teacher',
          'independent'
        ] as const)
        .required()
    }),
    {
      onError: () => {
        React.useEffect(() => {
          navigate(paths.error.pageNotFound._);
        }, []);
      }
    }
  );

  if (params === undefined) return <></>;

  const searchParams = tryValidateSync(
    fromSearchParams(),
    yup.object({
      success: yup.boolean()
        .required()
        .default(true)
    })
  );

  return (
    <Page.Container>
      <Page.Section maxWidth="md" className="flex-center">
        {searchParams?.success === true
          ? <Status
            userType={params.userType}
            header="We need to verify your email address"
            body={[
              'An email has been sent to the address you provided.',
              'Please follow the link within the email to verify your details. This will expire in 1 hour.',
              "If you don't receive the email within the next few minutes, check your spam folder."
            ]}
            imageProps={{
              alt: 'PaperPlane',
              src: PaperPlaneImg
            }}
          />
          : <Status
            userType={params.userType}
            header="Your email address verification failed"
            body={[
              'You used an invalid link, either you mistyped the URL or that link is expired.',
              'When you next attempt to log in, you will be sent a new verification email.'
            ]}
            imageProps={{
              alt: 'SadFace',
              src: SadFaceImg
            }}
          />
        }
      </Page.Section>
    </Page.Container>
  );
};

export default EmailVerification;
