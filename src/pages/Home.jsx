import { Box } from '@material-ui/core';
import React from 'react';
import { ArrayParam, StringParam, useQueryParam } from 'use-query-params';
import Search from '../components/Search/Search';
import Timers from '../components/Timer/Timers';
import * as groups from '../resources/index';

const timerDataByGroupNames = Object
  .entries(groups)
  .reduce((m, [name, timers]) => Object.assign(m, { [name]: timers }), {});

const groupNames = Object.keys(timerDataByGroupNames);

export default function Home() {
  const [groupName = '', setGroupName] = useQueryParam('group', StringParam);
  const [timers = [], setTimers] = useQueryParam('timers', ArrayParam);
  const data = timerDataByGroupNames[groupName] || {};

  return (
    <Box p={1}>
      <Search
        groupName={groupName}
        setGroupName={setGroupName}
        groupNames={groupNames}
        timers={timers}
        setTimers={setTimers}
        timerNames={Object.keys(data)}
      />
      <Timers
        names={timers}
        groups={data}
      />
    </Box>
  );
}
