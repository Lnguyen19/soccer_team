// src/Dropdown.jsx
import React from 'react';

const Dropdown = ({ options, onSelect, selected }) => {
  return (
    <>
      <select onChange={(e) => onSelect(e.target.value)} value={selected}>
        <option value="" disabled>Select Player</option>
        {options.map((op, index) => (
          <option key={index} value={op.Name}>
            {op.Name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
