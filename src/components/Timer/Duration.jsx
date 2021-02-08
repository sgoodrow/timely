import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';

const format = (seconds) => {
  const formatted = seconds > 0 ? moment.utc(seconds * 1000).format('H:mm:ss') : '00:00:00';
  return formatted.split(':');
};

function Time({ text }) {
  return (
    <Typography variant="body1">
      {text}
    </Typography>
  );
}

Time.propTypes = {
  text: PropTypes.string.isRequired,
};

function Unit({ text }) {
  return (
    <Box pr={0.5}>
      <Typography variant="caption">
        {text}
      </Typography>
    </Box>
  );
}

Unit.propTypes = {
  text: PropTypes.string.isRequired,
};

function Duration({
  duration, hide = false, opacity,
}) {
  const [hours, minutes, seconds] = format(duration);
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="baseline"
      style={hide ? { visibility: 'hidden' } : { opacity }}
    >
      <Time text={hours} />
      <Unit text="h" />
      <Time text={minutes} />
      <Unit text="m" />
      <Time text={seconds} />
      <Unit text="s" />
    </Box>
  );
}

export default memo(Duration);

Duration.defaultProps = {
  hide: false,
  opacity: 1,
};

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  hide: PropTypes.bool,
  opacity: PropTypes.number,
};
