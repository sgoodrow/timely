import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { Box } from '@material-ui/core';
import Timer from './Timer';

export default function Timers({ timers = [] }) {
  const sorted = orderBy(timers, ['remaining']);
  return (
    <Box display="flex" flexDirection="column">
      {sorted.map((timer) => (
        <Box key={timer.uuid} p={0.5}>
          <Timer
            key={timer.uuid}
            name={timer.name}
            duration={timer.duration}
            durationS={timer.durationS}
            remaining={timer.remaining}
            remainingS={timer.remainingS}
            warning={timer.warning}
            warningS={timer.warningS}
            started={timer.started}
          />
        </Box>
      ))}
    </Box>
  );
}

Timers.propTypes = {
  timers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
