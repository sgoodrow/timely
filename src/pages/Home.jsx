import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import Search from '../components/Search/Search';
import Timers from '../components/Timer/Timers';

export default function Home() {
  const [selectedTimers, setSelectedTimers] = useState([]);
  return (
    <Box p={1}>
      <Search setSelectedTimers={setSelectedTimers} />
      <Timers timerGroups={selectedTimers} />
    </Box>
  );
}
