import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import store from './store';
import theme from './theme';
import { HideContactUsWidget } from '../features/thirdParty';
import ScreenTimePopUp from '../features/ScreenTimePopUp';

const SCREENTIME_WARNING_INTERVAL = 60 * 60 * 1000;

const App: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    HideContactUsWidget();
    setTimeout(() => {
      setOpen(true);
    }, SCREENTIME_WARNING_INTERVAL);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScreenTimePopUp open={open} setOpen={setOpen} interval={SCREENTIME_WARNING_INTERVAL} />
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default App;
