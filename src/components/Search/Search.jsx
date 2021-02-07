/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as groups from '../../resources/index';

const timersByGroupName = Object
  .entries(groups)
  .reduce((m, [name, timers]) => {
    Object.assign(m, { [name]: timers });
    return m;
  }, {});

const zoneNames = Object.keys(timersByGroupName);

export default function Search({ setSelectedTimers }) {
  const [values, setValues] = useState('');
  const [timers, setTimers] = useState({});

  const handleGroupChange = (_, name) => {
    setTimers(name ? timersByGroupName[name] : {});
    setValues([]);
    setSelectedTimers([]);
  };

  const handleValueChange = (_, selected) => {
    setValues(selected);
    setSelectedTimers(selected.reduce((a, s) => a.concat(timers[s]), []));
  };

  const timerNames = Object.keys(timers);

  return (
    <Box display="flex" flexDirection="row">
      <Box pr={1}>
        <Autocomplete
          id="group-select"
          onChange={handleGroupChange}
          options={zoneNames}
          style={{ width: '20em' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Group"
              variant="outlined"
            />
          )}
        />
      </Box>
      <Autocomplete
        id="timers-select"
        value={values}
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
    </Box>
  );
}

Search.propTypes = {
  setSelectedTimers: PropTypes.func.isRequired,
};
