import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">
          Home
        </Typography>
      </Toolbar>

    </AppBar>
  );
}
