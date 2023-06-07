import React from 'react';
import { FormikProps } from 'formik';
import {
  Typography,
  Stack,
  Checkbox,
  Accordion,
  AccordionSummary
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { allBoxesChecked } from '../../helpers/arrayHelpers';

interface RapidRouterTabTitlesProps {
  title: string;
  levels: Array<{ levelNumber: string; name: string }>;
  formikProps: FormikProps<any>;
}
const RapidRouterTabTitles: React.FC<RapidRouterTabTitlesProps> = ({
  title,
  levels,
  formikProps
}) => {
  const theme = useTheme();
  return (
    <Accordion elevation={0} expanded={false}>
      <AccordionSummary
        sx={{
          cursor: 'default !important',
          paddingRight: '1.5rem',
          paddingLeft: 0
        }}
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography m={0} variant="h6">
            {title}
          </Typography>
          <Checkbox
            checked={allBoxesChecked(
              levels,
              formikProps.values.levelsSubmitted
            )}
            sx={{
              color: theme.palette.info.dark,
              '&.Mui-checked': {
                color: theme.palette.info.dark
              }
            }}
            onChange={(e: any) => {
              const startingValue = parseInt(levels[0].levelNumber) - 1;
              const currentLevels = formikProps.values.levelsSubmitted;
              for (
                let i = startingValue;
                i < levels.length + startingValue;
                i++
              ) {
                currentLevels[i] = e.target.checked ? `${i + 1}` : '';
              }
              formikProps.setValues({
                ...formikProps.values,
                levelsSubmitted: currentLevels
              });
            }}
          />
        </Stack>
      </AccordionSummary>
    </Accordion>
  );
};

export default RapidRouterTabTitles;
