/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS } from './styles';

const Dropdown = ({ label, options, selectedValue, onChange }) => {
  const data = options.map((item) => ({
    key: item.key ?? item.value,
    value: item.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectList
  setSelected={onChange}
  data={data}
  save="value"
  selected={selectedValue}
  defaultOption={selectedValue ? { value: selectedValue } : undefined} // ✅ this line
  boxStyles={styles.box}
  dropdownStyles={styles.dropdown}
  inputStyles={styles.input}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: COLORS.button,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  box: {
    backgroundColor: COLORS.button,
    borderColor: '#ccc',
  },
  dropdown: {
    backgroundColor: COLORS.button,
  },
  input: {
    color: COLORS.text,
  },
});

export default Dropdown;