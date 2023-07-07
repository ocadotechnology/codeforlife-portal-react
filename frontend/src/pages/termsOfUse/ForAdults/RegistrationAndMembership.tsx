import React from 'react';
import {
  ListItemText,
  Typography,
  Stack
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const RegistrationAndMembership: React.FC = () => {
  return (
    <Stack>
      <Typography fontWeight='bold'>
        Membership falls into the following categories under the Agreement outlined in this notice:
      </Typography>
      <ItemizedList styleType='disc'>
        <ListItemText>
          Administrators: person or persons assigned responsibility for the management and security of membership by other Users;
        </ListItemText>
        <ListItemText>
          Users: any person using the Code for Life website, Rapid Router, Kurono or any other game, application or platform of ours regardless of membership;
        </ListItemText>
        <ListItemText>
          Students: Users who are provided with login information for Code for Life by a teacher, parent, guardian or carer;
        </ListItemText>
        <ListItemText>
          Teachers; and
        </ListItemText>
        <ListItemText>
          Guardian, parents, carers.
        </ListItemText>
      </ItemizedList>
      <Typography>
        Many features of Code for Life require you to register as a User. Access to certain resources will be restricted from non-registered Users and Users who are not part of a participating school. Parents, guardians or carers of students registered through their school or club, should contact the child’s teacher directly to request copies of the teaching resources, to assist with homework or progression in learning how to program. Teachers should provide a valid and professional email address when registering on the Code for Life site.
      </Typography>
      <Typography>
        If you register a school or club, you will automatically become the responsible ‘Administrator’. You should provide a valid and professional email address when registering as a teacher. If you create a school on the Code for Life site, you, by default become an ‘Administrator’ for your school.
      </Typography>
      <Typography fontWeight='bold'>
        As an Administrator, you warrant that:
      </Typography>
      <ItemizedList styleType='disc'>
        <ListItemText>
          you are responsible and accountable for ensuring the online safety of the school or club for whom you are acting and that only legitimate institutional addresses should be accepted at sign up;
        </ListItemText>
        <ListItemText>
          all registration information you submit is accurate, complete and truthful;
        </ListItemText>
        <ListItemText>
          you will maintain the accuracy of such information; and
        </ListItemText>
        <ListItemText>
          if you are accepting the Terms & Conditions on behalf of a school or club, you have the authority to bind that institution, company or legal entity to the Terms & Conditions.
        </ListItemText>
      </ItemizedList>
      <Typography>
        The organisation Administrator is able to make other teachers in the organisation Administrators.
      </Typography>
      <Typography fontWeight='bold'>
        All Administrators should be aware that:
      </Typography>
      <ItemizedList styleType='disc'>
        <ListItemText>
          they are able to access all the classes, and the students of those classes, within the organisation. This also includes the students’ progress data, as well as any custom level created by colleagues or students within the organisation.
        </ListItemText>
        <ListItemText>
          they are able to manage (create, edit, transfer and remove) all the classes, students and levels within the organisation; and
        </ListItemText>
        <ListItemText>
          if there is only one Administrator in the organisation and that Administrator deletes their account, the Administrator role will automatically be transferred to the next Teacher in the organisation.
        </ListItemText>
      </ItemizedList>
      <Typography>
        As a User, you further warrant that you will only grant access codes to teachers, staff members and students who are current employees or students known to your school or club. Upon termination of a teacher or other staff member’s employment with you, you will ensure they assign over all existing classes and/or students to another teacher within your school or club. If at any time you become aware of a User who falsely claims to be affiliated with your school or club, you are obliged to notify the Code for Life team immediately.
      </Typography>
      <Typography>
        A Code for Life User must not choose a username or institution name that could potentially infringe anyone’s rights, which is intended to confuse, or which is offensive, hurtful or otherwise inappropriate, as reasonably determined by us. We reserve the right to change a username if we think it offends the Terms & Conditions. Users who are provided with login information for Code for Life by your teacher, parent, guardian or carer, are “Students”. Students are divided between those who are registered by a teacher through a school or club, or set up as an independent student using a parent, guardian, or carer email address.
      </Typography>
      <Typography>
        Please note that we are not an internet service provider. All Users of Code for Life must have internet access and the necessary software for email and web usage.
      </Typography>
      <Typography mb={0}>
        Code for Life’s Privacy Notice forms part of the Terms & Conditions, and your acceptance of the Terms & Conditions constitutes consent to the way we may handle your personal data as detailed in that notice.
      </Typography>
    </Stack >
  );
};

export default RegistrationAndMembership;
