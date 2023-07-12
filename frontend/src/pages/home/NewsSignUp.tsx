import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';

const NewsSignUp: React.FC<{
  signUpSuccess: boolean | undefined
}> = ({ signUpSuccess }) => {
  if (signUpSuccess === undefined) {
    return null;
  } else {
    return (
      <Page.Notification>
        {signUpSuccess ? 'Thank you for signing up! 🎉' : 'Invalid email address. Please try again.'}
      </Page.Notification>
    );
  };
};

export default NewsSignUp;
