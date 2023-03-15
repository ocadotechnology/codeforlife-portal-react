import React from 'react';

import AppBar from 'features/appBar/AppBar';
import StefanAppBar from 'features/appBar/StefanAppBar';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <AppBar />
      <StefanAppBar />
    </>
  );
}
