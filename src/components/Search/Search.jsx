/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default function Search({
  groupName, setGroupName, groupNames, timers, setTimers, timerNames,
}) {
  const handleGroupChange = (_, name) => {
    setGroupName(name);
    setTimers([]);
  };

  const handleValueChange = (_, selected) => {
    setTimers(selected);
  };

  return (
    <Paper>
      <Box display="flex" flexDirection="row" p={1}>
        <Box pr={1}>
          <Autocomplete
            id="group-select"
            value={groupName}
            onChange={handleGroupChange}
            options={groupNames}
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
      </Box>
    </Paper>
  );
}

Search.propTypes = {
  groupName: PropTypes.string.isRequired,
  setGroupName: PropTypes.func.isRequired,
  groupNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  timers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setTimers: PropTypes.func.isRequired,
  timerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
