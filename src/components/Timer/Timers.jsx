import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { orderBy, uniqueId } from 'lodash';
import { Box } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import Timer from './Timer';

const seconds = (duration) => (duration ? moment.duration(duration).asSeconds() : undefined);

const timer = (inputs) => ({
  name: inputs.name,
  duration: seconds(inputs.duration),
  warning: seconds(inputs.warning),
  remaining: seconds(inputs.duration),
  uuid: uniqueId(),
});

const assign = (m, t) => Object.assign(m, { [t.uuid]: t });
const create = (inputs) => inputs.reduce((m, i) => assign(m, timer(i)), {});
const filter = (groups, names) => names.reduce((a, n) => a.concat(groups[n]), []);

function Timers({ names, groups }) {
  const [timers, setTimers] = useState(create(filter(groups, names)));

  useEffect(() => {
    setTimers((prevTimers) => {
      // Look through the previous timers and preserve any that
      // are still selected in the new array; this ensures their
      // remaining duration does not reset.
      const inputs = filter(groups, names);
      const timerNames = inputs.map((i) => i.name);
      const existingTimers = Object.values(prevTimers)
        .filter((t) => timerNames.includes(t.name))
        .reduce((m, t) => assign(m, t), {});

      // Create new timers for the remainder.
      const existingTimerNames = Object.values(existingTimers).map((t) => t.name);
      const newTimerInputs = inputs.filter((i) => !existingTimerNames.includes(i.name));
      return { ...existingTimers, ...create(newTimerInputs) };
    });
  }, [names, groups]);

  const setRemaining = useCallback((uuid) => (remaining) => {
    setTimers((prev) => ({ ...prev, [uuid]: { ...prev[uuid], remaining } }));
  }, []);

  const sorted = orderBy(Object.values(timers), ['remaining', 'playing', 'name', 'uuid']).filter((t) => !!t.uuid);

  return (
    <Box display="flex" flexDirection="column">
      {sorted.map((t) => (
        <Box key={t.uuid} pt={1}>
          <Timer
            uuid={t.uuid}
            name={t.name}
            duration={t.duration}
            remaining={t.remaining}
            warning={t.warning}
            playing={t.playing}
            setRemaining={setRemaining}
          />
        </Box>
      ))}
    </Box>
  );
}

export default memo(Timers);

Timers.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  groups: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    warning: PropTypes.string,
  }))).isRequired,
};
