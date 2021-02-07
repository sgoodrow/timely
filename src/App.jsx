import {
  createMuiTheme,
  CssBaseline, MuiThemeProvider,
} from '@material-ui/core';
import React, { useState } from 'react';
import Router from './Router';
import Navigation from './Navigation';

export default function App() {
  const [dark, setDark] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <Navigation
          dark={dark}
          setDark={setDark}
        />
        <Router />
      </CssBaseline>
    </MuiThemeProvider>
  );
}
