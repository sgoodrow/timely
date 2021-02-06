import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, LinearProgress, Paper, Typography, withStyles,
} from '@material-ui/core';

const TallLinearProgress = withStyles(() => ({
  root: {
    height: '1em',
    borderRadius: '.2em',
  },
  bar: {
    borderRadius: '.2em',
  },
}))(LinearProgress);

export default function Timer({
  name, duration, durationS, remaining, remainingS, warningS,
}) {
  const progress = Math.min(Math.max(remainingS / durationS, 0), 1) * 100;
  const color = remainingS <= warningS ? 'primary' : 'secondary';

  return (
    <Paper elevation={1}>
      <Box p={1}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="subtitle2">{name}</Typography>
            </Box>
            <Box pl={1} style={durationS === remainingS ? { visibility: 'hidden' } : {}}>
              <Typography color="textSecondary">{duration}</Typography>
            </Box>
          </Box>
          <Box w={1} display="flex" flexDirection="row" alignItems="center">
            <Box flexGrow={1}>
              <TallLinearProgress color={color} variant="determinate" value={progress} />
            </Box>
            <Box pl={1}>
              <Typography>{remaining}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

Timer.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  durationS: PropTypes.string.isRequired,
  remaining: PropTypes.number.isRequired,
  remainingS: PropTypes.number.isRequired,
  warningS: PropTypes.string.isRequired,
};
