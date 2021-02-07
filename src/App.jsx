import { Box, CssBaseline } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Header/Navigation';
import Home from './pages/Home';

export default function App() {
  return (
    <CssBaseline>
      <Box bgcolor="#f5f5f5">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Box>
    </CssBaseline>
  );
}
