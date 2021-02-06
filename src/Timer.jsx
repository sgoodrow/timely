/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, LinearProgress, Paper, Typography, withStyles,
} from '@material-ui/core';
import moment from 'moment';

const TallLinearProgress = withStyles(() => ({
  root: {
    height: '1em',
    borderRadius: '.2em',
  },
  bar: {
    borderRadius: '.2em',
  },
}))(LinearProgress);

const format = (seconds) => {
  if (seconds <= 0) {
    return '00:00:00';
  }
  return moment.utc(seconds * 1000).format('HH:mm:ss');
};

function Timer({
  uuid, name, duration, remaining, warning, setRemaining,
}) {
  const [playing, setPlaying] = useState(false);
  const progress = Math.min(Math.max(remaining / duration, 0), 1) * 100;
  const color = remaining <= warning ? 'secondary' : 'primary';

  useEffect(() => {
    const timeout = setTimeout(() => {
      const diff = playing ? 1 : 0;
      setRemaining(uuid)(remaining - diff);
    }, 1000);
    return () => clearTimeout(timeout);
  });

  const handleTogglePlaying = (event) => {
    setPlaying((current) => !current);
    event.stopPropagation();
  };

  const restart = () => {
    setRemaining(uuid)(duration);
  };

  return (
    <Paper elevation={1}>
      <Box p={1} display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" flexGrow={1} justifyContent="center" pr={1} onClick={restart}>
          <Typography variant="subtitle2">{name}</Typography>
          <TallLinearProgress color={color} variant="determinate" value={progress} />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" pr={1}>
          <Typography color="textSecondary" style={duration === remaining ? { visibility: 'hidden' } : {}}>{format(duration)}</Typography>
          <Typography>{format(remaining)}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Button disabled={remaining <= 0} onClick={handleTogglePlaying}>{playing ? 'Pause' : 'Play'}</Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(Timer);

Timer.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  warning: PropTypes.number.isRequired,
  setRemaining: PropTypes.func.isRequired,
};
