import React from 'react';
import { Field } from 'formik';
import {
  Typography,
  Stack,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useTheme
} from '@mui/material';
import { allBoxesChecked } from '../../helpers/arrayHelpers';

interface RapidRouterTabsProps {
  name: string;
  formik: any;
  color: any;
  levels: Array<{
    level: string;
    name: string;
  }>;
}

const RapidRouterTabs: React.FC<RapidRouterTabsProps> = ({
  name,
  levels,
  color,
  formik
}) => {
  const handleCheckboxChange: (idx: string, e: any) => void = (idx, e) => {
    const currentLevels = formik.values.levelsSubmitted;
    currentLevels[parseInt(idx) - 1] = e.target.checked ? `${idx}` : '';
    formik.setValues({ ...formik.values, levelsSubmitted: currentLevels });
  };

  const selectAll: (e: any) => void = (e: any) => {
    const currentLevels = formik.values.levelsSubmitted;

    const startingValue = parseInt(levels[0].level) - 1;
    for (let i = startingValue; i < levels.length + startingValue; i++) {
      currentLevels[i] = e.target.checked ? `${i + 1}` : '';
    }
    formik.setValues({
      ...formik.values,
      levelsSubmitted: currentLevels
    });
  };

  const theme = useTheme();
  return (
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary
          sx={{
            paddingRight: 0,
            background: color,
            color: theme.palette.success.contrastText
          }}
        >
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography m={0} variant="h5">
              {name}
            </Typography>
            <Field
              as={Checkbox}
              name="levelsSubmitted"
              sx={{
                color: theme.palette.common.white,
                '&.Mui-checked': {
                  color: theme.palette.common.white
                },
                '&.MuiCheckbox-indeterminate': {
                  color: theme.palette.common.white
                }
              }}
              checked={allBoxesChecked(levels, formik.values.levelsSubmitted)}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              onChange={(e: any) => {
                selectAll(e);
              }}
            />
          </Stack>
        </AccordionSummary>
        {levels.map((element, idx) => (
          <Stack
            key={`${element.level}-${element.name}}`}
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor={theme.palette.info.light}
            color={theme.palette.common.black}
          >
            <AccordionDetails key={element.level}>
              {element.level}: {element.name} {[idx]}
            </AccordionDetails>
            <Field
              as={Checkbox}
              name="levelsSubmitted"
              value={`${element.level}`} // Formik cannot handle numbers
              sx={{
                color,
                '&.Mui-checked': {
                  color
                }
              }}
              checked={
                formik.values.levelsSubmitted[parseInt(element.level) - 1] !==
                ''
              }
              onChange={(e: any) => {
                handleCheckboxChange(element.level, e);
              }}
            />
          </Stack>
        ))}
      </Accordion>
    </Box>
  );
};

export default RapidRouterTabs;
