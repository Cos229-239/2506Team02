/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';

const Dropdown = ({ label, options, selectedValue, onChange }) => {
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme] || THEMES.default;

  const data = options.map((item) => ({
    key: item.key ?? item.value,
    value: item.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text> {/* Ensure text color matches the theme */}
      <SelectList
        setSelected={onChange}
        data={data}
        save="value"
        selected={selectedValue}
        defaultOption={selectedValue ? { value: selectedValue } : undefined}
        boxStyles={[styles.box, { backgroundColor: colors.button, borderColor: colors.text }]}
        dropdownStyles={[styles.dropdown, { backgroundColor: colors.button }]}
        inputStyles={[styles.input, { color: colors.text }]}
        dropdownItemStyles={styles.dropdownItem}
        dropdownTextStyles={[styles.dropdownText, { color: colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  box: {
    borderWidth: 1,
    borderRadius: 6,
  },
  dropdown: {
    maxHeight: 300,  // Ensure that the dropdown doesn't overflow too much
  },
  input: {
    fontSize: 16,
  },
  dropdownItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default Dropdown;
