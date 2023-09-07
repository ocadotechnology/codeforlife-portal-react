import {
  CheckboxField,
  Form,
  PasswordField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { FormikValues } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import { Typography, Unstable_Grid2 as Grid, useTheme } from '@mui/material';

import { useVerifyPasswordMutation } from '../../app/api';
import TeacherDialog, { ConfirmPopup } from './TeacherDialog';

export interface DeleteAccountFormProps {
  userType: 'teacher' | 'independent';
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ userType }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyPassword] = useVerifyPasswordMutation();
  const [confirmationPopup, setConfirmationPopup] = React.useState({
    open: false
  });
  const [dialog, setDialog] = React.useState<{
    open: boolean;
    onDeleteAccount?: () => void;
  }>({ open: false });

  return (
    <>
      <pre>{JSON.stringify(location)}</pre>
      <Typography variant="h5">Delete account</Typography>
      <Typography>
        If you no longer wish to have a Code for Life account, you can delete it
        by confirming below. You will receive an email to confirm this decision.
      </Typography>
      <Typography fontWeight="bold">
        This can&apos;t be reversed. All classes you&apos;ve created will be
        permanently erased.
      </Typography>
      <Form
        initialValues={{
          password: '',
          unsubscribeNewsletter: false
        }}
        onSubmit={(values) => {
          verifyPassword({ password: values.password })
            .unwrap()
            .then((res) => {
              if (res.isPasswordCorrect) {
                setConfirmationPopup({ open: !confirmationPopup.open });
              } else {
                scrollTo(0, 0);
                navigate(location.pathname, {
                  state: {
                    notifications: [
                      {
                        index: 0,
                        props: {
                          children:
                            'Your account was not deleted due to incorrect password.'
                        }
                      }
                    ]
                  }
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        // then: () => {
        //   const redirectPath = location.pathname.includes('teacher') ? paths.login.teacher._ : paths.login.independent._;
        //   navigate(redirectPath, { state: { notification: 'Your account was successfully deleted' } });
        // }
        // })}
        // TODO: validate if teacher has classes. If not, delete account immediately.
        //   setDialog({
        //     open: true,
        //     onDeleteAccount: () => {
        //       deleteAccount(values)
        //         .unwrap()
        //         // TODO: ensure user is logged out.
        //         .then(() => { navigate(paths._); })
        //         .catch((error) => {
        //           setFormErrors(error, setErrors);
        //           setDialog({ open: false });
        //         });
        //     }
        //   });
        // }}
      >
        {(form: FormikValues) => {
          return (
            <>
              <pre>{JSON.stringify(form.values)}</pre>
              <ConfirmPopup
                password={form.values.password}
                unsubscribeNewsletter={form.values.unsubscribeNewsletter}
                toggle={setConfirmationPopup}
                open={confirmationPopup.open}
                userType="independent"
              />
              ;
              <Grid container columnSpacing={4}>
                <Grid xs={12} sm={6}>
                  <PasswordField
                    placeholder="Current password"
                    helperText="Enter your current password"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <CheckboxField
                    name="unsubscribeNewsletter"
                    formControlLabelProps={{
                      label:
                        'Please remove me from the newsletter and marketing emails too.'
                    }}
                  />
                </Grid>
              </Grid>
              <SubmitButton
                className="alert"
                endIcon={<DeleteOutlineIcon />}
                sx={{ marginTop: theme.spacing(3) }}
              >
                Delete account
              </SubmitButton>
            </>
          );
        }}
      </Form>
      {userType === 'teacher' && dialog.onDeleteAccount !== undefined && (
        <TeacherDialog
          open={dialog.open}
          onClose={() => {
            setDialog({ open: false });
          }}
          onDeleteAccount={dialog.onDeleteAccount}
        />
      )}
    </>
  );
};

export default DeleteAccountForm;
