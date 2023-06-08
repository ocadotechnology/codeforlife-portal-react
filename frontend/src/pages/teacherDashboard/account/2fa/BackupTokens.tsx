import React from 'react';
import { Button, Link, ListItemText, Typography } from '@mui/material';
import { paths } from '../../../../app/router';
import { ItemizedList } from 'codeforlife/lib/esm/components';
import Page from 'codeforlife/lib/esm/components/page';

const BackupTokens: React.FC = (): JSX.Element => {
  const backupTokens = ['token1', 'token2', 'token3', 'token4', 'token5', 'token6', 'token7', 'token8', 'token9', 'token10'];

  return (
    <Page.Section>
      <Typography align="center" variant="h4">
        Backup tokens
      </Typography>
      <Link href={paths.teacher.dashboard.account._} color="inherit" className="body">
        &lt; Back to Your account
      </Link>
      <Typography>
        Backup tokens can be used when your primary and backup phone numbers aren&apos;t available. The backup tokens
        below can be used for login verification. If you&apos;ve used up all your backup tokens, you can generate a
        new set of backup tokens. Only the backup tokens shown below will be valid.
      </Typography>
      <Typography>
        You don&apos;t have any backup codes yet.
      </Typography>
      <ItemizedList styleType='disc'>
        {backupTokens.map((backupToken, index) => (
          <ListItemText key={index}>{backupToken}</ListItemText>
        ))}
      </ItemizedList>
      <Typography color="error">
        When you generate new recovery codes, you must download or print the new codes. Your old codes won&apos;t work
        anymore.
      </Typography>
      {/* TODO: Connect backend so it generates backup tokens and show corresponding text from text above */}
      <Button>
        Generate tokens
      </Button>
    </Page.Section>
  );
};

export default BackupTokens;
