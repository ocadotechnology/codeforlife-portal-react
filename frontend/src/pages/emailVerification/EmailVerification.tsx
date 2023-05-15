import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getSearchParams, stringToBoolean } from 'codeforlife/lib/esm/helpers';

import SadFaceImg from '../../images/sadface.png';
import PaperPlaneImg from '../../images/paper_plane.png';
import { paths } from '../../app/router';
import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import Status from './Status';

enum UserType {
  Teacher = 'teacher',
  Student = 'student',
  Independent = 'independent'
}

interface EmailVerificationParams {
  success: boolean;
  userType: UserType;
}

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();

  let params = getSearchParams({
    success: stringToBoolean,
    userType: String
  }) as EmailVerificationParams | null;

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;
  else if (!Object.values(UserType).includes(params.userType)) {
    params = null;
    return <></>;
  }

  return (
    <BasePage>
      <PageSection maxWidth="md" className="flex-center">
        {params.success
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
          />}
      </PageSection>
    </BasePage>
  );
};

export default EmailVerification;
