import { Box } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';

export default function App() {
  return (
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
  );
}
