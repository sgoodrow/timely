import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as allTimerGroups from '../../resources/index';

const options = Object.keys(allTimerGroups);

export default function Search({ setTimerGroups }) {
  const handleAutocompleteChange = (_, selected) => {
    const timerGroups = selected.reduce((a, s) => {
      const group = allTimerGroups[s];
      return a.concat(group);
    }, []);
    setTimerGroups(timerGroups);
  };

  return (
    <Box>
      <Autocomplete
        id="search-select"
        onChange={handleAutocompleteChange}
        options={options}
        fullWidth
        multiple
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
