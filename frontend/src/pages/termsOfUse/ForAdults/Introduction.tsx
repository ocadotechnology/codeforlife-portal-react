import React from 'react';
import {
  Divider,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';

const Introduction: React.FC = () => {
  return (
    <Grid container columnSpacing={3}>
      <Grid xs={12} md={6}>
        <Typography>
          Ocado Innovation Limited (as “Ocado Technology”), the division that powers Ocado.com, the world’s largest online-only grocery retailer, has launched Code for Life. Code for Life is a nationwide corporate social responsibility initiative to help support primary and secondary school teachers deliver the new computer science curriculum. The aim of the initiative is to equip every child in the country with the “coding survival skills” that will enable them to flourish in an increasingly digital world.
        </Typography>
        <Typography>
          Ocado Innovation Limited is committed to protecting any data that we collect concerning you. By using our services on this website you are agreeing to the use of the data that we collect in accordance with the Privacy Notice and the Terms of Use (together, the “Terms & Conditions”), so please read these carefully.
        </Typography>
      </Grid>
      <Grid xs={12} md={6}>
        <Typography>
          Ocado Innovation Limited is committed to providing a valuable source of supporting materials for teachers to deliver the current primary school curriculum, as well as a fun, educational web application from which students can learn. The Terms & Conditions form a legal document which sets out your rights and obligations, and those of Ocado Innovation Limited, a company registered in England under registered company number 08813912 with its registered office at Buildings One & Two Trident Place, Mosquito Way, Hatfield, Hertfordshire, United Kingdom, AL10 9UL (“Ocado Innovation Limited”, “we”, “our” or “us” as appropriate in the context), in relation to the entire contents of the Code for Life website and the games, platforms and other products or services offered by Ocado Technology from time to time (collectively, “Code for Life”).
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Divider style={{ marginTop: 2, marginBottom: 18 }} />
      </Grid>
      <Grid xs={12} md={6}>
        <Typography fontWeight='bold'>
          Important: If you are under 13 years of age you must have your parent, guardian or carer’s consent to register for a Code for Life account, and to use their email address. If you are using this at school, you must first have your teacher’s permission to use this site. These Terms of Use were most recently updated on 11th July 2022.
        </Typography>
        <Typography>
          Code for Life includes all versions of “Rapid Router”, “Kurono” and any other games, platforms and other products or services released by us (whether online or otherwise), from time to time, including all Code for Life websites used to play the games, platforms and any other products or services that we make available. “Code for Life” and “Rapid Router” are registered UK trade marks of Ocado Innovation Limited.
        </Typography>
        <Typography>
          You must take the time to read and understand the Terms of Use and the Privacy Notice before registering for Code for Life.
        </Typography>
      </Grid>
      <Grid xs={12} md={6}>
        <Typography fontWeight='bold'>
          By registering, you accept that you are entering into a contract with us in accordance with the Terms & Conditions and the Privacy Notice. Visitors to the Code for Life portal who do not register to become a User, similarly affirm that they are bound by the Terms & Conditions and the Privacy Notice each time they access the Code for Life site. We reserve the right to update the Terms of Use at any time, so please check them periodically, as all changes will be binding on you provided that you use the website after they have been made. To assist you in determining whether the Terms & Conditions have changed since your most recent visit to the website, we will display the date when the Terms of Use and Privacy Notice were most recently updated.
        </Typography>
        <Typography fontWeight='bold'>
          Important: You must ensure that any email address we hold for you is kept up-to-date and that you have full access to it. Important notifications are sent to the email address you provide. Failure to keep this information updated can result in your Code for Life account being deleted and/or restricted.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Introduction;
