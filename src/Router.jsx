import { Container } from '@material-ui/core';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';

export default function Router() {
  return (
    <Container>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
}
