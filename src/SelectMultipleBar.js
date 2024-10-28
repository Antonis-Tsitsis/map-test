import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';

export function SelectMultipleBar({ filterType, filterOptions, filters, group, applyFilters }) {
  const [selectedOptions, setSelectedOptions] = useState(filters || []);

  useEffect(() => {
    setSelectedOptions(filters); 
  }, [filters]);

  const handleToggle = (option) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option) 
      : [...selectedOptions, option]; 
    setSelectedOptions(newSelection);
    applyFilters(newSelection, group);
  };

  const getPartStyle = (option) => {
    let backgroundColor;
    if (option === 'Low') backgroundColor = selectedOptions.includes(option) ? 'green' : '#cccccc';
    else if (option === 'Medium') backgroundColor = selectedOptions.includes(option) ? 'yellow' : '#cccccc';
    else if (option === 'High') backgroundColor = selectedOptions.includes(option) ? 'red' : '#cccccc';
    
    let borderLeft = 'none';
    let borderRight = 'none';
    if (option === 'Medium') {
      borderLeft = '1px solid #fff';
      borderRight = '1px solid #fff';
    }

    return {
      backgroundColor,
      borderLeft,
      borderRight,
      color: backgroundColor === 'yellow' ? 'grey' : 'white',
      cursor: 'pointer',
      padding: '10px',
      textAlign: 'center',
      flex: 1,
    };
  };

  return (
    <div style={{ margin: '20px 20px 20px 0' }}>

      <Box display="flex" justifyContent="center" mb={1}>
        <Typography variant="subtitle1">
          {filterType}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        style={{
          backgroundColor: '#f0f0f0',
          borderRadius: '8px', 
          border: '2px solid #ccc',
          overflow: 'hidden', 
        }}
      >

        {filterOptions.map((option) => (
          <Box
            key={option}
            style={getPartStyle(option)}
            onClick={() => handleToggle(option)}
          >
            <Typography variant="body1">{option}</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}
