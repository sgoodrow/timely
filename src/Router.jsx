import { Container } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';

export default function Router() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}
