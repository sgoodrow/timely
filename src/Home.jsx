import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import moment from 'moment';
import Timers from './Timers';
import initialTimers from './resources/disco_1';

const seconds = (duration) => moment.duration(duration).asSeconds();

const createTimer = (inputs) => ({
  name: inputs.name,
  duration: inputs.duration,
  warning: inputs.warning || '00:00',
  remaining: inputs.duration,
  durationS: seconds(inputs.duration),
  warningS: seconds(inputs.warning || '00:00'),
  remainingS: seconds(inputs.duration),
  started: false,
  uuid: uniqueId(),
});

export default function Home() {
  const [timers] = useState(initialTimers.map(createTimer));
  return <Container><Timers timers={timers} /></Container>;
}
