import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Select,
  SelectProps,
  MenuItem,
  FormHelperText,
  FormHelperTextProps
} from '@mui/material';

import { form } from 'codeforlife/lib/esm/theme/typography';

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

export interface DatePickerProps {
  defaultsToToday?: boolean,
  previousYears?: number,
  helperText?: string,
  formHelperTextProps?: FormHelperTextProps,
  onChange: (date: Date | undefined) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
  defaultsToToday = false,
  previousYears = 150,
  helperText,
  formHelperTextProps,
  onChange
}) => {
  const now = new Date();

  const [date, setDate] = React.useState((defaultsToToday)
    ? { day: now.getDay(), month: now.getMonth(), year: now.getFullYear() }
    : { day: 0, month: 0, year: 0 }
  );

  const dayIsDisabled = date.month === 0 || date.year === 0;

  if ([date.day, date.month, date.year].every(n => n !== 0)) {
    onChange(new Date(date.year, date.month, date.day));
  }

  function getLastDay(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  function _onChange(
    key: 'day' | 'month' | 'year',
    value: number | string
  ): void {
    const newDate = { ...date };
    newDate[key] = Number(value);

    if (key !== 'day' &&
      !dayIsDisabled &&
      newDate.day > getLastDay(newDate.month, newDate.year)
    ) {
      newDate.day = 0;
      onChange(undefined);
    }

    setDate(newDate);
  }

  function getDayOptions(): number[] {
    return Array
      .from(Array(getLastDay(date.month, date.year)).keys())
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
      marginBottom={form.marginBottom}
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
          value={date.day}
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
          value={date.month}
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
          value={date.year}
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

export default DatePicker;
