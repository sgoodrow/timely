/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper } from '@material-ui/core';
import SelectTimers from './SelectTimers';
import SelectGroup from './SelectGroup';

export default function Search({
  groupName, setGroupName, groupNames, timers, setTimers, timerNames,
}) {
  return (
    <Paper>
      <Box p={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <SelectGroup
              groupName={groupName}
              setGroupName={setGroupName}
              groupNames={groupNames}
              setTimers={setTimers}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectTimers
              timers={timers}
              setTimers={setTimers}
              timerNames={timerNames}
            />
          </Grid>
        </Grid>
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
