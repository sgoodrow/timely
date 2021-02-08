/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default function SelectTimers({
  timers, setTimers, timerNames,
}) {
  const handleValueChange = (_, selected) => {
    setTimers(selected);
  };
  return (
    <Autocomplete
      id="timers-select"
      value={timers}
      onChange={handleValueChange}
      options={timerNames}
      fullWidth
      multiple
      disabled={!timerNames.length}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Timers"
          variant="outlined"
        />
      )}
    />
  );
}

SelectTimers.propTypes = {
  timers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setTimers: PropTypes.func.isRequired,
  timerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
