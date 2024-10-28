import React, { useEffect, useState } from 'react';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

export function SelectMultiple({ filterType, filterOptions, filters, group, applyFilters }) {
  const [selectedOptions, setSelectedOptions] = useState(filters || []);

  useEffect(() => {
    setSelectedOptions(filters); 
  }, [filters]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(value);
    applyFilters(value, group);
  };

  return (
    <div style={{ margin: '20px 20px 20px 0' }}>
      <FormControl fullWidth>
        <InputLabel style={{ paddingLeft: 10 }}>{filterType}</InputLabel>
        <Select
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label={filterType} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
