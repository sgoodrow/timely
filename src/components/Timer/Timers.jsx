import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { orderBy, uniqueId } from 'lodash';
import { Box } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import Timer, { height } from './Timer';

export const seconds = (duration) => moment.duration(duration).asSeconds();

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

function Timers({
  names, groups, customTimers, remCustom,
}) {
  const [timers, setTimers] = useState(create([...customTimers, ...filter(groups, names)]));
  // temp hack
  if (names.length > 10000) {
    remCustom('asdf');
  }
  useEffect(() => {
    setTimers((prevTimers) => {
      // Look through the previous timers and preserve any that
      // are still selected in the new array; this ensures their
      // remaining duration does not reset.
      const inputs = [...customTimers, ...filter(groups, names)];
      const timerNames = inputs.map((i) => i.name);
      const existingTimers = Object.values(prevTimers)
        .filter((t) => timerNames.includes(t.name))
        .reduce((m, t) => assign(m, t), {});

      // Create new timers for the remainder.
      const existingTimerNames = Object.values(existingTimers).map((t) => t.name);
      const newTimerInputs = inputs.filter((i) => !existingTimerNames.includes(i.name));
      return { ...existingTimers, ...create(newTimerInputs) };
    });
  }, [names, groups, customTimers]);

  const setRemaining = useCallback((uuid) => (remaining) => {
    setTimers((prev) => ({ ...prev, [uuid]: { ...prev[uuid], remaining } }));
  }, []);

  const sorted = orderBy(Object.values(timers), ['remaining', 'playing', 'name', 'uuid']).filter((t) => !!t.uuid);

  const transitions = useTransition(
    sorted.map((t, i) => ({ ...t, y: i * height })),
    (t) => t.uuid,
    {
      from: { position: 'absolute', opacity: 0, width: '0%' },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, opacity: 1, width: '100%' }),
      update: ({ y }) => ({ y }),
    },
  );

  return (
    <Box position="relative">
      {transitions.map(({ item, props: { y, ...rest }, key }) => (
        <animated.div
          key={key}
          style={{
            transform: y.interpolate((yi) => `translate3d(0,${yi}px,0)`),
            ...rest,
          }}
        >
          <Box pt={1}>
            <Timer
              uuid={item.uuid}
              name={item.name}
              duration={item.duration}
              remaining={item.remaining}
              warning={item.warning}
              playing={item.playing}
              setRemaining={setRemaining}
            />
          </Box>
        </animated.div>
      ))}
    </Box>
  );
}

export default memo(Timers);

const timerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  warning: PropTypes.string,
});

Timers.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  groups: PropTypes.objectOf(PropTypes.arrayOf(timerShape)).isRequired,
  customTimers: PropTypes.arrayOf(PropTypes.shape(timerShape)).isRequired,
  remCustom: PropTypes.func.isRequired,
};
