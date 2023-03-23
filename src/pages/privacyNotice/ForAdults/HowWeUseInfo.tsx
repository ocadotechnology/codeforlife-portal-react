import React from 'react';
import {
  Typography,
  ListItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  tableCellClasses,
  ListItemText
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const CustomTableRow: React.FC<{
  left: string,
  right: any
}> = ({ left, right }) => (
  <TableRow>
    <TableCell>
      <Typography>
        {left}
      </Typography>
    </TableCell>
    <TableCell>
      {typeof right === 'string'
        ? <Typography>
          {right}
        </Typography>
        : <ItemizedList styleType='disc' pl={2}>
          {right}
        </ItemizedList>
      }
    </TableCell>
  </TableRow>
);

const HowWeUseInfo: React.FC = () => (
  <>
    <Typography>
      We need all the categories of information that we describe above, so that we can:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          perform our agreement with you and provide you with our services. For example, to enable you to create an account and to access the portal and our learning materials. Having an account gives teachers access to course material, class and individual student management features, and also it gives students access to the portal in order to learn how to code within a supported environment (classroom), or independently (at home).
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          fulfil our legitimate interests, such as our interests to:
        </Typography>
        <ItemizedList styleType='circle'>
          <ListItem>
            <Typography>
              improve our services.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              ensure that our portal is secure and is used in accordance with our Terms. For example, we may use account information to limit a user temporarily or permanently from the Code for Life portal if that user engages in inappropriate use of the site (e.g. giving other people access to their user account, malicious misuse of the portal, including spam).
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              send you important information: for example, we use your email address to send you account verification emails, emails to notify you about changes to our Terms, or about any maintenance impacting your access to the portal. Sometimes, we may be required by law to send you this information.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              provide customer support and respond to your queries, for example, when you use the Contact Us form. We strongly advise you not to disclose personal information (other than name and email address) when contacting us – messages you exchange on the portal and any forms you submit to us will be recorded. The Contact Us form is strictly for the purpose of user support. User-initiated communication concerning topics other than those relating directly to the Code for Life portal, including resources or user experience, may not be answered. Please be aware that we will never ask for personal information other than what is required to identify your account and respond to your queries, and we will never ask for your password.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              protect our legal rights, for example, if we need to defend ourselves in court.
            </Typography>
          </ListItem>
        </ItemizedList>
      </ListItem>
      <ListItem>
        <Typography>
          with your permission (or if you are under 13, the permission of the person who looks after you) to send you marketing communications (for example, our newsletter or communications about our portal features or upcoming events). You have the right to change your mind at any time (see the “Your Rights” section below for more information).
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          with your permission (or if you are under 13, the permission of the person who looks after you), use cookies to collect information about how you use our portal, in order to analyse and improve user experience. This information is usually anonymised and used at an aggregate level. Please see section “Cookies” below for more information on what information we collect and how we use cookies.
        </Typography>
      </ListItem>
    </ItemizedList>
    <Typography>
      We summarise below the purposes for which we use your personal data and the lawful basis on which we rely.
    </Typography>
    <Table sx={{
      [`.${tableCellClasses.root}`]: {
        border: '1px solid grey'
      }
    }}>
      <TableHead sx={{
        [`.${tableCellClasses.head}`]: {
          backgroundColor: 'grey',
          '.MuiTypography-root': {
            color: '#fff',
            fontWeight: 'bold'
          }
        }
      }}>
        <CustomTableRow
          left="Purpose"
          right="Legal basis"
        />
      </TableHead>
      <TableBody>
        <CustomTableRow
          left="To allow you to create an account and provide our services to you through our portal, such as providing course material and resources"
          right="Contractual necessity: the information is necessary to fulfil our contract with you."
        />
        <CustomTableRow
          left="To manage our relationship with you, including to allow you to manage your account, provide customer support, to handle your requests and queries, to provide you with information about our services that you use, or information about changes in our Terms or this Notice"
          right={<>
            <ListItemText>
              Contractual necessity: to the extent the information is necessary to fulfil our contract with you (e.g. to ensure that we provide to you the services that you have requested).
            </ListItemText>
            <ListItemText>
              Legitimate interests: to the extent the information is necessary to process queries and effectively manage our relationship with you as user of our services.
            </ListItemText>
            <ListItemText>
              Compliance with a legal obligation: to the extent we are required by law to contact you in order to provide certain information (for example, to notify you of changes to our Terms)
            </ListItemText>
          </>}
        />
        <CustomTableRow
          left="To send you our newsletters and other promotional material about Code for Life"
          right={<>
            <ListItemText>
              Your consent, where this is required by law.
            </ListItemText>
            <ListItemText>
              Otherwise, when consent is not required, we will rely on our legitimate interest to keep you informed of our services, to the extent this is permitted by law.
            </ListItemText>
          </>}
        />
        <CustomTableRow
          left="To carry out analysis and compile statistics about the use of our portal, and the use of our services, in order to enable us to provide a better service, feature and functionality"
          right={<>
            <ListItemText>
              Your consent: where we obtain this information by using cookies.
            </ListItemText>
            <ListItemText>
              Our legitimate interest to ensure the smooth and effective functioning of our portal and services, to make sound business decisions about our services and to design, inform and deploy our business strategies.
            </ListItemText>
          </>}
        />
        <CustomTableRow
          left="To authenticate your account and to ensure the security of our portal, information systems and assets, to monitor compliance with our Terms, to prevent illegal activities in relation to our services."
          right="Our legitimate interest to protect our business assets against illegal or inappropriate activities or security threats and your legitimate interest to protect the security of your account and information."
        />
        <CustomTableRow
          left="To protect our legal rights and to establish, exercise or defend legal claims relating to our services."
          right="Our legitimate interest to protect our legal rights."
        />
        <CustomTableRow
          left="For accounting, record keeping and audit purposes"
          right="Our legitimate interest to effectively manage our business, audit our business processes and make informed business decisions."
        />
      </TableBody>
    </Table>
    <Typography>
      When we rely on legitimate interests to process personal data, we consider and balance those interests against any potential impact on you (both positive and negative) and your rights and interests. If we consider that our interests are overridden by the impact on you, we will not use your personal data in this way (unless the law gives us another valid ground to do so). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us.
    </Typography>
  </>
);

export default HowWeUseInfo;
