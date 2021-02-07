import React, { useCallback, useEffect, useState } from 'react';
import { orderBy, uniqueId } from 'lodash';
import { Box } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import Timer from './Timer';

const seconds = (duration) => (duration ? moment.duration(duration).asSeconds() : undefined);

const createTimer = (inputs) => ({
  name: inputs.name,
  duration: seconds(inputs.duration),
  warning: seconds(inputs.warning),
  remaining: seconds(inputs.duration),
  uuid: uniqueId(),
});

const createTimers = (inputs) => inputs.reduce((m, i) => {
  const timer = createTimer(i);
  Object.assign(m, { [timer.uuid]: timer });
  return m;
}, {});

export default function Timers({ timerGroups }) {
  const [timers, setTimers] = useState(createTimers(timerGroups));

  useEffect(() => {
    const newTimers = createTimers(timerGroups);
    setTimers(newTimers);
  }, [timerGroups]);

  const updateTimerRemaining = (uuid, remaining) => {
    setTimers((prevTimers) => ({ ...prevTimers, [uuid]: { ...prevTimers[uuid], remaining } }));
  };

  const setRemaining = useCallback((uuid) => (remaining) => {
    updateTimerRemaining(uuid, remaining);
  }, []);

  const sorted = orderBy(Object.values(timers), ['remaining', 'name', 'uuid']);

  return (
    <Box display="flex" flexDirection="column">
      {sorted.map((timer) => (
        <Box key={timer.uuid} pt={1}>
          <Timer
            uuid={timer.uuid}
            name={timer.name}
            duration={timer.duration}
            remaining={timer.remaining}
            warning={timer.warning}
            playing={timer.playing}
            setRemaining={setRemaining}
          />
        </Box>
      ))}
    </Box>
  );
}

Timers.propTypes = {
  timerGroups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    warning: PropTypes.string,
  })).isRequired,
};
