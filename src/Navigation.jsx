import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Brightness3, Brightness7,
} from '@material-ui/icons';
import React from 'react';

export default function Navigation({ dark, setDark }) {
  const handleThemeChange = () => {
    setDark((d) => !d);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6">
            Timerly
          </Typography>
        </Box>
        <IconButton
          aria-label="theme"
          onClick={handleThemeChange}
        >
          {dark ? <Brightness3 /> : <Brightness7 style={{ color: 'white' }} />}
        </IconButton>
      </Toolbar>

    </AppBar>
  );
}

Navigation.propTypes = {
  dark: PropTypes.bool.isRequired,
  setDark: PropTypes.func.isRequired,
};
