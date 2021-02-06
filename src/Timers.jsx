import React, { useCallback, useState } from 'react';
import { orderBy, uniqueId } from 'lodash';
import { Box } from '@material-ui/core';
import moment from 'moment';
import Timer from './Timer';
import initialTimers from './resources/disco_1';

const seconds = (duration) => moment.duration(duration).asSeconds() / 100;

const createTimer = (inputs) => ({
  name: inputs.name,
  duration: seconds(inputs.duration),
  warning: seconds(inputs.warning || '00:00:00'),
  remaining: seconds(inputs.duration),
  uuid: uniqueId(),
});

export default function Timers() {
  const [timers, setTimers] = useState(initialTimers.reduce((m, i) => {
    const timer = createTimer(i);
    Object.assign(m, { [timer.uuid]: timer });
    return m;
  }, {}));

  const updateTimer = (uuid, newTimer) => {
    setTimers((prevTimers) => ({ ...prevTimers, [uuid]: newTimer }));
  };

  const setRemaining = useCallback((uuid) => (remaining) => {
    const newTimer = { ...timers[uuid], remaining };
    updateTimer(uuid, newTimer);
  }, []);

  const sorted = orderBy(Object.values(timers), ['remaining']);

  return (
    <Box display="flex" flexDirection="column">
      {sorted.map((timer) => (
        <Box key={timer.uuid} p={0.5}>
          <Timer
            key={timer.uuid}
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
};
