/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default function SelectGroup({
  groupName, setGroupName, groupNames, setTimers,
}) {
  const handleGroupChange = (_, name) => {
    setGroupName(name || '');
    setTimers([]);
  };
  return (
    <Autocomplete
      id="group-select"
      value={groupName}
      onChange={handleGroupChange}
      options={groupNames}
      style={{ width: '20em' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Group"
          variant="outlined"
        />
      )}
    />
  );
}

SelectGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  setGroupName: PropTypes.func.isRequired,
  groupNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setTimers: PropTypes.func.isRequired,
};
