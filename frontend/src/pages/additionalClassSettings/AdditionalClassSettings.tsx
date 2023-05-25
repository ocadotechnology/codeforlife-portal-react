import React from 'react';
import PageSection from '../../components/PageSection';
import BasePage from '../BasePage';
import { getSearchParams } from 'codeforlife/lib/esm/helpers';
import { Typography } from '@mui/material';
import BackToLinkTextButton from '../../components/BackToLinkTextButton';
import { paths } from '../../app/router';
import { useTheme } from '@mui/material';
import { TextField } from 'codeforlife/lib/esm/components/form';
import BaseForm from '../login/BaseForm';

const AdditionalClassSettings: React.FC = () => {
  const params = getSearchParams({
    accessCode: { cast: String }
  }) as { accessCode: string };
  const theme = useTheme();
  return (
    <BasePage>
      <PageSection>
        <Typography variant="h4">
          Additional class settings class {'<CLASS NAME>'} ({params.accessCode}
          ))
        </Typography>
        <BackToLinkTextButton
          href={`${paths.teacherClass}?accessCode=${params.accessCode}`}
          text="Back to Edit Class"
        />
        <Typography variant="body2">
          You may change the name of the class, or change permissions to allow
          external requests from independent students to join this class. You
          may also transfer the class to another teacher, or change permissions
          to allow pupils to see their classmates&apos; progress.
        </Typography>
      </PageSection>
      <PageSection bgcolor={theme.palette.info.light}>
        <Typography variant="h5">Class details</Typography>
        <BaseForm
          header='Class details'
          submitButton

      </PageSection>
    </BasePage>
  );
};

export default AdditionalClassSettings;
