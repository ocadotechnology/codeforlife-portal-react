import {
  ThemeOptions,
  createTheme,
  responsiveFontSizes
} from '@mui/material';

import { themeOptions as cflThemeOptions } from 'codeforlife/lib/esm/theme';

export const themeOptions: ThemeOptions = {
  ...cflThemeOptions
};

const theme = responsiveFontSizes(createTheme(themeOptions));

export default theme;
