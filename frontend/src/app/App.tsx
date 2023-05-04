import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import store from './store';
import theme from './theme';
import './App.css';

const App: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      {children}
    </Provider>
  </ThemeProvider>
);

export default App;
