import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import store from './store';
import theme from './theme';
import { HideContactUsWidget } from '../features/thirdParty';

const App: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  useEffect(() => {
    HideContactUsWidget();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default App;
