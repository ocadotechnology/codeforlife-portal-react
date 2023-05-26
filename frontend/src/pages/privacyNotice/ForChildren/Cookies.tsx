import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Link,
  Button
} from '@mui/material';

const CustomTableRow: React.FC<{
  withoutUnderline?: boolean,
  typesOfCookies: string,
  purpose: React.ReactNode,
  howLong: string
}> = ({
  withoutUnderline = false,
  typesOfCookies,
  purpose,
  howLong
}) => (
    <TableRow>
      <TableCell>
        <Typography style={{
          textDecoration: withoutUnderline ? 'none' : 'underline'
        }}>
          {typesOfCookies}
        </Typography>
      </TableCell>
      <TableCell>
        {typeof purpose === 'string'
          ? <Typography>{purpose}</Typography>
          : purpose
        }
      </TableCell>
      <TableCell>
        <Typography>
          {howLong}
        </Typography>
      </TableCell>
    </TableRow>
  );

const Cookies: React.FC = () => <>
  <Typography>
    We will only use your personal information for the reasons we collected it or for other similar reasons. If we need to use your personal information for a different reason, we will tell you. We do not always need your consent to use your personal information, and we will not ask for your consent unless the law says we need it.
  </Typography>
  <Typography>
    Please see the “What are cookies” (not the edible kind!) section below for more information on what information we collect and how we use cookies.
  </Typography>
  <Typography variant='h6'>
    What are cookies?
  </Typography>
  <Typography>
    Cookies are tiny files that have information (data) in them. When you visit our site, we may put some cookies on the device you use. Cookies allow us to remember things like when you visit our site. They help us understand how you are using the Code for Life portal, as well as which parts of our portal are popular and which ones we need to make better.
  </Typography>
  <Typography>
    We also make use of things called “web beacons” or “pixels.” These are similar to cookies and allow us to keep an eye on how well our website is working and look for ways to improve it. To keep things simple, when we talk about cookies in this Privacy Notice, we also mean web beacons and pixels.
  </Typography>
  <Typography variant='h6'>
    Types of cookies used
  </Typography>
  <Typography>
    You can see all the different cookies we use and what we use them for below.
  </Typography>
  <Table className='text'>
    <TableHead>
      <CustomTableRow
        withoutUnderline
        typesOfCookies='Types of cookies'
        purpose='Purpose'
        howLong='How long does it stay on the browser?'
      />
    </TableHead>
    <TableBody className='text'>
      <CustomTableRow
        typesOfCookies='Strictly necessary cookies'
        purpose='These cookies do what you have asked for: for example, they allow the website to load on your device, they keep you logged in when you use our site and help keep our site safe. If you turn off these cookies using your browser settings, then it could stop some parts of the site from working.'
        howLong='12 months'
      />
      <CustomTableRow
        typesOfCookies='Functional cookies'
        purpose='These cookies allow the website to remember your settings each time you revisit the site (for example how you have your sound set up). If you do not allow these cookies, then some services may not work as smoothly.'
        howLong='For as long as you are on the site'
      />
      <CustomTableRow
        typesOfCookies='Analytics/Performance cookies'
        purpose={<>
          <Typography>
            These cookies help us understand how you use our site, so we can improve the service we provide. This can be anything like which pages you go to most often and if you get error messages from web pages. They allow us to measure how visitors use the portal (for example which parts of the website are clicked on and the length of time between clicks).
          </Typography>
          <Typography>
            We use other companies called (
            <Link
              className='body'
              href='https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage'
            >
              Google Analytics
            </Link>
            &nbsp;and&nbsp;
            <Link
              className='body'
              href='https://mouseflow.com/legal/gdpr/'
            >
              Mouseflow
            </Link>
            ) to help us collect information from these cookies (see the “Third-party cookies” section below).
          </Typography>
        </>}
        howLong='24 months'
      />
    </TableBody>
  </Table>
  <Typography variant='h6'>
    Third party cookies
  </Typography>
  <Typography>
    We work with other companies to run the analytics cookies on our portal, including Google, who provides our Google Analytics cookie, and Mouseflow. They might also collect information from websites that are not ours. We explain in more detail below what information they collect and how it is used. We do not let other companies show ads on our portal.
  </Typography>
  <Typography>
    <strong>Google Analytics.</strong> We use Google Analytics (which is run by Google) to help us understand how you use our site. The information it collects about your use of the website (including your IP address) will be stored by Google in the United States. Google may pass this information to other organisations who help them to interpret this information. They may also pass the information to other organisations if the law says they have to do so. If you choose to allow analytics / performance cookies on our site, you are consenting to Google using your data for the reasons above.
  </Typography>
  <Typography>
    <strong>Mouseflow.</strong> We also use Mouseflow to help us understand how our site is used and which areas are mostly used. It uses cookies to record information such as when you click on or move your mouse, when you scroll or press a key, what pages you visit on our website, how much time you spend on each page, and also information about the device you use (like the device type (desktop/tablet/phone), location (city/country) and language). Mouseflow does not collect any information on pages where it is not installed and does not track or collect information outside your web browser.
  </Typography>
  <Typography variant='h6'>
    Managing and disabling cookies
  </Typography>
  <Typography>
    You can switch the functional and analytics cookies on and off at any time by clicking this button below.
  </Typography>
  {/* TODO: open cookie settings on click */}
  {/* TODO: set padding bottom via theme */}
  <Button>
    Cookie Settings
  </Button>
  <Typography>
    You cannot switch strictly necessary cookies off as our website won’t work properly without them.
  </Typography>
</>;

export default Cookies;
