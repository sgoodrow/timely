import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import { ArrayParam, StringParam, useQueryParam } from 'use-query-params';
import Search from '../components/Search/Search';
import Timers from '../components/Timer/Timers';
import * as groups from '../resources/index';

const timersByGroupName = Object
  .entries(groups)
  .reduce((m, [name, timers]) => {
    Object.assign(m, { [name]: timers });
    return m;
  }, {});

const groupNames = Object.keys(timersByGroupName);

export default function Home() {
  const [groupName = '', setGroupName] = useQueryParam('group', StringParam);
  const [timers = [], setTimers] = useQueryParam('timers', ArrayParam);

  const groupTimers = groupName ? timersByGroupName[groupName] : {};
  const timerGroups = useMemo(() => timers.reduce((a, s) => a.concat(groupTimers[s]), []), []);

  return (
    <Box p={1}>
      <Search
        groupName={groupName}
        setGroupName={setGroupName}
        groupNames={groupNames}
        timers={timers}
        setTimers={setTimers}
        timerNames={Object.keys(groupTimers)}
      />
      <Timers timerGroups={timerGroups} />
    </Box>
  );
}
