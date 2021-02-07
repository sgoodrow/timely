import { Box, CssBaseline } from '@material-ui/core';
import React from 'react';
import Router from './Router';

export default function App() {
  return (
    <CssBaseline>
      <Box bgcolor="#f5f5f5">
        <Router />
      </Box>
    </CssBaseline>
  );
}
