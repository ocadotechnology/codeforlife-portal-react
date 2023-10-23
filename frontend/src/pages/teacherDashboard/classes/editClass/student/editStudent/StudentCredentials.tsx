import { Stack, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { useNavigate } from 'codeforlife/lib/esm/hooks';

import { useRetrieveClassQuery } from '../../../../../../app/api';
import paths from '../../../../../../app/router/paths';
import { accessCodeSchema } from '../../../../../../app/schemas';
import NewStudentsTable, {
  DownloadButtonPDF,
  NewStudentsTableProps
} from '../../../../../../features/newStudentsTable/NewStudentsTable';

export interface StudentCredentialsState {
  users: NewStudentsTableProps['users'];
}

const StudentCredentials: React.FC = () => {
  const navigate = useNavigate();
  const { state }: { state: StudentCredentialsState } = useLocation();

  const accessCode = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema.required() })
  )?.accessCode;

  if (accessCode === undefined ||
    typeof state !== 'object' ||
    state === null ||
    !('users' in state) ||
    !Array.isArray(state.users) ||
    state.users.length === 0
  ) {
    navigate(paths.teacher.dashboard.classes._, {
      replace: true,
      state: {
        notifications: [
          {
            index: 1,
            props: {
              error: true,
              children: accessCode === undefined
                ? 'Invalid class access code.'
                : 'Missing student details.'
            }
          }
        ]
      }
    });
    return <></>;
  }

  const klass = useRetrieveClassQuery({ accessCode });

  return (klass.data !== undefined &&
    <Page.Container>
      <Page.Banner
        subheader={`${klass.data.name}, (${klass.data.accessCode})`}
        textAlign='center'
        header='Class and class access code:'
      />
      <Page.Notification>
        <Stack
          direction='row'
          justifyContent='space-between'
        >
          <Typography mb={0}>
            This is the only time you will be able to view this page. You can
            print reminder cards or download as a CSV file.
          </Typography>
          <DownloadButtonPDF isButtonBanner={true} />
        </Stack>
      </Page.Notification>
      <Page.Section>
        <NewStudentsTable
          accessCode={klass.data.accessCode}
          users={state.users}
        />
      </Page.Section>
    </Page.Container>
  );
};

export default StudentCredentials;
