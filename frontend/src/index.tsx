import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { App } from 'codeforlife/lib/esm/components';

import router from './app/router';
import theme from './app/theme';
import store from './app/store';
import Header from './features/header/Header';
import Footer from './features/footer/Footer';
import reportWebVitals from './reportWebVitals';

import './scripts/freshDesk';

const container = document.getElementById('root');

if (container === null) throw new Error('root element is null');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App theme={theme} store={store}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
