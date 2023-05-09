import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Select,
  SelectProps,
  MenuItem,
  FormHelperText,
  FormHelperTextProps
} from '@mui/material';

const monthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export interface CflDatePickerProps {
  defaultsToToday?: boolean,
  previousYears?: number,
  helperText?: string,
  formHelperTextProps?: FormHelperTextProps,
  onChange: (date: Date) => void
}

const CflDatePicker: React.FC<CflDatePickerProps> = ({
  defaultsToToday = false,
  previousYears = 150,
  helperText,
  formHelperTextProps,
  onChange
}) => {
  const now = new Date();

  const [date, setDate] = React.useState({
    wasChanged: false,
    value: (defaultsToToday)
      ? { day: now.getDay(), month: now.getMonth(), year: now.getFullYear() }
      : { day: 0, month: 0, year: 0 }
  });

  const dayIsDisabled = date.value.month === 0 || date.value.year === 0;

  if (date.wasChanged && [
    date.value.day, date.value.month, date.value.year
  ].every(n => n !== 0)) {
    onChange(new Date(date.value.year, date.value.month, date.value.day));
  }

  function getLastDay(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  function _onChange(
    key: 'day' | 'month' | 'year',
    value: number | string
  ): void {
    const newDateValue = { ...date.value };
    newDateValue[key] = Number(value);

    if (key !== 'day' &&
      !dayIsDisabled &&
      newDateValue.day > getLastDay(newDateValue.month, newDateValue.year)
    ) { newDateValue.day = 0; }

    setDate({ wasChanged: true, value: newDateValue });
  }

  function getDayOptions(): number[] {
    return Array
      .from(Array(getLastDay(date.value.month, date.value.year)).keys())
      .map(day => day + 1);
  }

  const yearOptions = Array
    .from(Array(previousYears).keys())
    .map(year => year + 1 - previousYears + now.getFullYear())
    .reverse();

  const commonSelectProps: SelectProps<number> = {
    style: { backgroundColor: 'white', width: '100%' },
    size: 'small'
  };

  return (
    <Grid
      container
      columnSpacing={2}
    >
      {helperText !== undefined && helperText !== '' &&
        <Grid xs={12}>
          <FormHelperText {...formHelperTextProps}>
            {helperText}
          </FormHelperText>
        </Grid>
      }
      <Grid xs={4}>
        <Select
          id='select-day'
          value={date.value.day}
          onChange={(event) => { _onChange('day', event.target.value); }}
          disabled={dayIsDisabled}
          {...commonSelectProps}
        >
          <MenuItem className='header' value={0}>
            Day
          </MenuItem>
          {!dayIsDisabled && getDayOptions().map((day) =>
            <MenuItem key={`day-${day}`} value={day} dense>
              {day}
            </MenuItem>
          )}
        </Select>
      </Grid>
      <Grid xs={4}>
        <Select
          id='select-month'
          value={date.value.month}
          onChange={(event) => { _onChange('month', event.target.value); }}
          {...commonSelectProps}
        >
          <MenuItem className='header' value={0}>
            Month
          </MenuItem>
          {monthOptions.map((month, index) =>
            <MenuItem key={`month-${month}`} value={index + 1} dense>
              {month}
            </MenuItem>
          )}
        </Select>
      </Grid>
      <Grid xs={4}>
        <Select
          id='select-year'
          value={date.value.year}
          onChange={(event) => { _onChange('year', event.target.value); }}
          {...commonSelectProps}
        >
          <MenuItem className='header' value={0}>
            Year
          </MenuItem>
          {yearOptions.map((year) =>
            <MenuItem key={`year-${year}`} value={year} dense>
              {year}
            </MenuItem>
          )}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CflDatePicker;
