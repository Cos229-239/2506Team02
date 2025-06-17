import React from 'react';

export function Dropdown({ options, onChange, label }) {
  return (
    <View>
      <label>{label}</label>
      <select onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </View>
  );
}

export default Dropdown;