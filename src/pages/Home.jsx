import { Box } from '@material-ui/core';
import React, { useCallback } from 'react';
import {
  ArrayParam, StringParam, useQueryParam,
} from 'use-query-params';
import Controls from '../components/Controls/Controls';
import Timers from '../components/Timer/Timers';
import * as groups from '../resources/index';

const timerDataByGroupNames = Object
  .entries(groups)
  .reduce((m, [name, timers]) => Object.assign(m, { [name]: timers }), {});

const groupNames = Object.keys(timerDataByGroupNames);

const TimerParam = {
  encode: (value) => value.map((t) => [t.name, '-', t.duration].join('')).join(','),
  decode: (str) => str?.split(',').map((t) => {
    const [name, duration] = t.split('-');
    return { name, duration };
  }) || [],
};

export default function Home() {
  const [groupName = '', setGroupName] = useQueryParam('group', StringParam);
  const [timers = [], setTimers] = useQueryParam('timers', ArrayParam);
  const [customTimers = [], setCustomTimers] = useQueryParam('custom', TimerParam);

  const addCustomTimer = useCallback((timer) => setCustomTimers(
    (prev = []) => [...prev, timer],
  ), [setCustomTimers]);

  const remCustomTimer = useCallback((name) => setCustomTimers(
    (prev = []) => [...prev.filter((t) => t.name !== name)],
  ), [setCustomTimers]);

  const data = timerDataByGroupNames[groupName] || {};

  return (
    <Box p={1}>
      <Controls
        groupName={groupName}
        setGroupName={setGroupName}
        groupNames={groupNames}
        timers={timers}
        setTimers={setTimers}
        timerNames={Object.keys(data)}
        addTimer={addCustomTimer}
      />
      <Timers
        names={timers}
        groups={data}
        customTimers={customTimers}
        remCustom={remCustomTimer}
      />
    </Box>
  );
}
