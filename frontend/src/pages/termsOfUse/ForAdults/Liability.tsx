import React from 'react';
import {
  Stack,
  Typography,
  ListItemText
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const Liability: React.FC = () => {
  return (
    <Stack>
      <Typography>
        The website, use of the application and games, and access to any accounts is provided by us on an “as is” basis without any warranties or guarantees. We do not accept responsibility for any errors, omissions, or for the results obtained from the use of such information or for any technical problems you may experience with the website.
      </Typography>
      <Typography>
        We shall not be liable for:
      </Typography>
      <ItemizedList styleType='disc'>
        <ListItemText>
          any viruses or other disabling features that affect your access to or use of the website (including your account);
        </ListItemText>
        <ListItemText>
          incompatibility of the Code for Life website with any of your equipment, software or telecommunications links;
        </ListItemText>
        <ListItemText>
          delays or failures which you may experience whilst conducting any activity on the Code for Life website;
        </ListItemText>
        <ListItemText>
          technical problems including errors or interruptions of the Code for Life website;
        </ListItemText>
        <ListItemText>
          unsuitability, unreliability or inaccuracy of the Code for Life website, or the inadequacy of the Code for Life website to meet your requirements; or
        </ListItemText>
        <ListItemText>
          consequential or incidental damages (including but not limited to loss of revenue, loss of profits, loss of anticipated savings, wasted expenditure and loss of data) or any other indirect, special or punitive damages whatsoever that arise out of or are related to the Code for Life website.
        </ListItemText>
      </ItemizedList>
      <Typography>
        Nothing in the Terms & Conditions shall exclude or limit our liability for:
      </Typography>
      <ItemizedList styleType='disc'>
        <ListItemText>
          death or personal injury caused by our negligence;
        </ListItemText>
        <ListItemText>
          fraud or fraudulent misrepresentation by us; or
        </ListItemText>
        <ListItemText>
          any liability which we cannot exclude or limit by law.
        </ListItemText>
      </ItemizedList>
    </Stack>
  );
};

export default Liability;
