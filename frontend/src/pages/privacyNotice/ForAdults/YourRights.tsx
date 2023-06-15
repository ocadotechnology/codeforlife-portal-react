import React from 'react';
import {
  Typography,
  ListItemText,
  Link
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const YourRights: React.FC = () => (
  <>
    <Typography>
      Under data protection laws, you have certain rights in relation to your personal information, which you can exercise free of charge. In summary, those include the right to:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItemText>
        request a copy of your personal information and to certain other extra information that this Privacy Notice is already designed to address;
      </ListItemText>
      <ListItemText>
        require us to correct any mistakes in your information which we hold;
      </ListItemText>
      <ListItemText>
        require the erasure of personal information concerning you in certain situations;
      </ListItemText>
      <ListItemText>
        receive the personal information concerning you which you have provided to us, in a structured, commonly used and machine-readable format (e.g. in pdf or .csv format) and have the right to transmit those data to a third party in certain situations;
      </ListItemText>
      <ListItemText>
        object (say no) at any time to processing of personal information concerning you for direct marketing;
      </ListItemText>
      <ListItemText>
        object (say no) in certain other situations to our continued processing of your personal information;
      </ListItemText>
      <ListItemText>
        otherwise require us to only store but not use your personal information in certain circumstances;
      </ListItemText>
      <ListItemText>
        where you have given your permission for us to use your information, to change your mind at any time.
      </ListItemText>
    </ItemizedList>
    <Typography>
      Please note these rights may be <strong>limited</strong>, for example if fulfilling your request would reveal personal data about another person or if you ask us to delete information which we are required by law to keep or have compelling legitimate interests in keeping. We will inform you of the relevant exemptions upon which we rely when responding to any request you make.
    </Typography>
    <Typography>
      If you would like to exercise any of those rights, please:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItemText>
        email our Data Protection Officer at&nbsp;
        <Link href='mailto:individualrights@ocado.com'>
          individualrights@ocado.com
        </Link>
        ;
      </ListItemText>
      <ListItemText>
        let us have enough information to identify you (e.g. username, full name and email address); and
      </ListItemText>
      <ListItemText>
        let us know (if possible) the information to which your request relates.
      </ListItemText>
    </ItemizedList>
    <Typography>
      If you would like to unsubscribe from any email newsletter or other promotional emails, you can click on the unsubscribe link which you can find at the bottom of our emails, in order to be removed from our mailing list. It could take up to 72 hours to process the update through our systems.
    </Typography>
  </>
);

export default YourRights;
