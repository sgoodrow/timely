import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import Search from '../components/Search/Search';
import Timers from '../components/Timer/Timers';

export default function Home() {
  const [timerGroups, setTimerGroups] = useState([]);
  return (
    <Container>
      <Search setTimerGroups={setTimerGroups} />
      <Timers timerGroups={timerGroups} />
    </Container>
  );
}
