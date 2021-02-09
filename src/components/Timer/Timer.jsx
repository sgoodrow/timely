import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, ButtonBase, fade, IconButton, makeStyles, Paper, Typography,
} from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
import Duration from './Duration';
import Bar from './Bar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.1),
    },
  },
}));

const pixels = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
export const height = pixels(3.8);

function Timer({
  uuid, name, duration, remaining, warning = 0, setRemaining,
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const start = new Date().getTime();
    const timeout = setTimeout(() => {
      const final = new Date().getTime();
      const diff = playing ? (final - start) / 1000 : 0;
      setRemaining(uuid)(Math.max(remaining - diff, 0));
    }, 300);
    return () => clearTimeout(timeout);
  });

  const togglePlaying = () => {
    setPlaying((current) => !current);
  };

  const handleClickButton = (event) => {
    togglePlaying();
    event.stopPropagation();
  };

  const handleClickProgressBar = () => {
    if (remaining === 0) {
      setRemaining(uuid)(duration);
      setPlaying(true);
      return;
    }

    togglePlaying();
  };

  const classes = useStyles();

  return (
    <Paper>
      <Box display="flex">
        <ButtonBase
          className={classes.root}
          onClick={handleClickProgressBar}
        >
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
          >
            <Box p={1}>
              <Typography style={{ textAlign: 'left' }} variant="subtitle2">
                {name}
              </Typography>
              <Bar
                duration={duration}
                remaining={remaining}
                warning={warning}
                playing={playing}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pr={1}
          >
            <Duration
              duration={duration}
              hide={duration === remaining && !playing}
              opacity={0.5}
            />
            <Duration duration={remaining} />
          </Box>
        </ButtonBase>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <IconButton
            disabled={remaining <= 0}
            onClick={handleClickButton}
          >
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(Timer);

Timer.defaultProps = {
  warning: 0,
};

Timer.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  setRemaining: PropTypes.func.isRequired,
  warning: PropTypes.number,
};
