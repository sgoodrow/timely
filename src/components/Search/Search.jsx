import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as timerGroups from '../../resources/index';

export default function Search({ setTimerGroups }) {
  const options = Object.keys(timerGroups);

  const handleAutocompleteChange = (_, option) => {
    setTimerGroups(timerGroups[option]);
  };

  return (
    <Box>
      <Autocomplete
        id="search-select"
        onChange={handleAutocompleteChange}
        options={options}
        fullWidth
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Timer Groups"
            variant="outlined"
          />
        )}
      />
    </Box>
  );
}

Search.propTypes = {
  setTimerGroups: PropTypes.func.isRequired,
};
