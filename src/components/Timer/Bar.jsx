import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, makeStyles, useTheme } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    height: '1em',
    borderRadius: '.2em',
  },
  bar: (props) => ({
    borderRadius: '.2em',
    backgroundColor: props.color,
  }),
  colorPrimary: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
});

const getHue = (remaining, warning, playing) => {
  if (!playing) {
    return grey;
  }
  return remaining <= warning ? red : green;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function Bar({
  playing, duration, remaining, warning = 0,
}) {
  const theme = useTheme();
  const hue = getHue(remaining, warning, playing);
  const foregroundValue = theme.palette.type === 'dark' ? 600 : 500;
  const backgroundValue = theme.palette.type === 'dark' ? 900 : 300;

  const classes = useStyles({
    color: hue[foregroundValue],
    backgroundColor: grey[backgroundValue],
  });

  const progress = clamp(remaining / duration, 0, 1) * 100;

  return (
    <LinearProgress
      classes={{
        root: classes.root,
        bar: classes.bar,
        colorPrimary: classes.colorPrimary,
      }}
      variant="determinate"
      value={progress}
    />
  );
}

export default Bar;

Bar.propTypes = {
  playing: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  warning: PropTypes.number.isRequired,
};
