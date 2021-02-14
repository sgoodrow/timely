import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, IconButton, TextField,
} from '@material-ui/core';
import { Add, Cancel, Edit } from '@material-ui/icons';
import { BooleanParam, useQueryParam } from 'use-query-params';
import SelectTimers from './SelectTimers';
import SelectGroup from './SelectGroup';

const MINUTES = 60;
const HOURS = 60 * MINUTES;

export default function Controls({
  groupName, setGroupName, groupNames, timers, setTimers, timerNames, addTimer,
}) {
  const [editing, setEditing] = useQueryParam('editing', BooleanParam);
  const [name, setName] = useState('Test');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('10');
  const [seconds, setSeconds] = useState('10');

  const nameRef = useRef();

  const handleClickEditing = () => setEditing((e) => !e);
  const handleAddTimer = () => {
    addTimer({
      name,
      duration: hours * HOURS + minutes * MINUTES + seconds,
    });
    setName('');
    nameRef.current.focus();
  };

  const EditIcon = editing ? Cancel : Edit;

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box
        display="flex"
        flexGrow={1}
        alignItems="center"
        m={1}
      >
        {editing
          ? (
            <>
              <Box flexGrow={1}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  inputRef={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  fullWidth
                />
              </Box>
              <Box flexGrow={1} pl={1}>
                <TextField
                  id="hours"
                  label="Hours"
                  variant="outlined"
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box flexGrow={1} pl={1}>
                <TextField
                  id="minutes"
                  label="Minutes"
                  variant="outlined"
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box flexGrow={1} pl={1}>
                <TextField
                  id="seconds"
                  label="Seconds"
                  variant="outlined"
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box pl={1}>
                <IconButton onClick={handleAddTimer}>
                  <Add />
                </IconButton>
              </Box>
            </>
          )
          : (
            <>
              <Box flexGrow={1}>
                <SelectGroup
                  groupName={groupName}
                  setGroupName={setGroupName}
                  groupNames={groupNames}
                  setTimers={setTimers}
                />
              </Box>
              <Box flexGrow={1} pl={1}>
                <SelectTimers
                  timers={timers}
                  setTimers={setTimers}
                  timerNames={timerNames}
                />
              </Box>
            </>
          )}
      </Box>
      <Box>
        <IconButton onClick={handleClickEditing}>
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

Controls.propTypes = {
  groupName: PropTypes.string.isRequired,
  setGroupName: PropTypes.func.isRequired,
  groupNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  timers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setTimers: PropTypes.func.isRequired,
  timerNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addTimer: PropTypes.func.isRequired,
};
