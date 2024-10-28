import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

export function SelectMultipleSearch({ filterType, filterOptions, filters, group, applyFilters }) {
  const [selectedOptions, setSelectedOptions] = React.useState(filters || []);
  const [searchTerm, setSearchTerm] = React.useState('');


  React.useEffect(() => {
    setSelectedOptions(filters || []);
  }, [filters]);

  const filteredOptions = filterOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = (event, value) => {
    setSelectedOptions(value);
    applyFilters(value, group);
  };

  const renderBoldText = (text, boldText) => {
    const parts = text.split(new RegExp(`(${boldText})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === boldText.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'bold', display: 'inline' }}>{part}</span>
          ) : (
            <span key={index} style={{ display: 'inline' }}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div style={{ margin: '20px 20px 20px 0' }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={filteredOptions}
        value={selectedOptions}
        onChange={handleSelectChange}
        onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} variant="outlined" />
          ))
        }
        renderOption={(props, option) => (
          <li {...props}>{renderBoldText(option, searchTerm)}</li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={filterType}
            placeholder={`Search ${filterType}`}
          />
        )}
      />
    </div>
  );
}
