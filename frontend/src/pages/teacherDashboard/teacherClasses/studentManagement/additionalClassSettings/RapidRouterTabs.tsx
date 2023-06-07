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
import { allBoxesChecked } from '../../../../../helpers/arrayHelpers';
import { ExpandMore } from '@mui/icons-material';

interface RapidRouterTabsProps {
  episode: {
    name: string;
    levelRange: string;
    color: any;
    levels: Array<{
      levelNumber: string;
      name: string;
    }>;
  };
  formik: any;
}

const RapidRouterTabs: React.FC<RapidRouterTabsProps> = ({
  episode,
  formik
}) => {
  const handleCheckboxChange: (idx: string, e: any) => void = (idx, e) => {
    const currentLevels = formik.values.levelsSubmitted;
    currentLevels[parseInt(idx) - 1] = e.target.checked ? `${idx}` : '';
    formik.setValues({ ...formik.values, levelsSubmitted: currentLevels });
  };

  const selectAll: (e: any) => void = (e: any) => {
    const currentLevels = formik.values.levelsSubmitted;

    const startingValue = parseInt(episode.levels[0].levelNumber) - 1;
    for (
      let i = startingValue;
      i < episode.levels.length + startingValue;
      i++
    ) {
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
          expandIcon={<ExpandMore />}
          sx={{
            paddingRight: 0,
            background: episode.color,
            color: theme.palette.success.contrastText
          }}
        >
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              pr={15}
              width="100%"
            >
              <Typography m={0} variant="h6">
                {episode.name}
              </Typography>
              <Typography m={0}>Levels {episode.levelRange}</Typography>
            </Stack>
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
              checked={allBoxesChecked(
                episode.levels,
                formik.values.levelsSubmitted
              )}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              onChange={(e: any) => {
                selectAll(e);
              }}
            />
          </Stack>
        </AccordionSummary>
        {episode.levels.map((element, idx) => (
          <Stack
            key={`${element.levelNumber}-${element.name}}`}
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor={theme.palette.info.light}
            color={theme.palette.common.black}
          >
            <AccordionDetails key={element.levelNumber}>
              {element.levelNumber}: {element.name}
            </AccordionDetails>
            <Field
              as={Checkbox}
              name="levelsSubmitted"
              value={`${element.levelNumber}`} // Formik cannot handle numbers
              sx={{
                marginRight: '1.5rem',
                color: episode.color,
                '&.Mui-checked': {
                  color: episode.color
                }
              }}
              checked={
                formik.values.levelsSubmitted[
                  parseInt(element.levelNumber) - 1
                ] !== ''
              }
              onChange={(e: any) => {
                handleCheckboxChange(element.levelNumber, e);
              }}
            />
          </Stack>
        ))}
      </Accordion>
    </Box>
  );
};

export default RapidRouterTabs;
