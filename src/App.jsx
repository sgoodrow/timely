import {
  createMuiTheme,
  CssBaseline, MuiThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { useQueryParam, BooleanParam } from 'use-query-params';
import Router from './Router';
import Navigation from './Navigation';

export default function App() {
  const [dark = false, setDark] = useQueryParam('dark', BooleanParam);

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
