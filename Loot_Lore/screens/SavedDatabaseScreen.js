import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
import BackButton from '../BackButton';
import { savedDataOptions, savedDataRouteMap } from '../data/savedDataOptions';

export default function SavedDatabaseScreen() {
  const navigation = useNavigation();
  const [selectedSavedData, setSelectedSavedData] = useState('');
  const [dropdownResetKey, setDropdownResetKey] = useState(0);
  const { theme, boldText } = useContext(ThemeContext);

  const styles = getGlobalStyles(theme);
  const colors = THEMES[theme];

  // ✅ Automatically reset when screen regains focus
  useFocusEffect(
    useCallback(() => {
      setSelectedSavedData('');
      setDropdownResetKey((prev) => prev + 1);
    }, [])
  );

  const handleConfirm = () => {
    const targetRoute = savedDataRouteMap[selectedSavedData];
    if (targetRoute) {
      navigation.navigate(targetRoute);
      setSelectedSavedData('');
      setDropdownResetKey((prev) => prev + 1); // manual reset
    } else {
      alert('Please select a saved data type first.');
    }
  };

  const handleBack = () => {
    navigation.goBack(); // ✅ no manual reset needed anymore
  };

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            localStyles.scroll,
            { backgroundColor: colors.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={[
              styles.header,
              { color: colors.text, fontWeight: boldText ? 'bold' : 'normal' },
            ]}
          >
            Select Saved Data
          </Text>

          <SelectList
            key={dropdownResetKey}
            setSelected={(key) => {
              const selected = savedDataOptions.find((option) => option.key === key);
              setSelectedSavedData(selected?.value || '');
            }}
            data={savedDataOptions}
            placeholder="Choose Saved Database"
            boxStyles={[
              localStyles.dropdown,
              {
                backgroundColor: colors.button,
                borderColor: colors.text,
              },
            ]}
            inputStyles={{
              color: colors.text,
              fontWeight: boldText ? 'bold' : 'normal',
              textAlign: 'center',
            }}
            dropdownStyles={[
              localStyles.dropdownList,
              { backgroundColor: colors.button },
            ]}
            dropdownItemStyles={localStyles.dropdownItem}
            dropdownTextStyles={{
              color: colors.text,
              fontWeight: boldText ? 'bold' : 'normal',
              textAlign: 'center',
            }}
          />
        </ScrollView>

        <View
          style={[
            localStyles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.text,
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!selectedSavedData}
            style={[
              localStyles.confirmButton,
              { backgroundColor: colors.button },
              !selectedSavedData && { opacity: 0.5 },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Confirm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBack} style={{ marginTop: 10 }}>
            <BackButton />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}


const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdown: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownItem: {
    borderBottomWidth: 1,
  },
  confirmButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  footer: {
    borderTopWidth: 1,
    padding: 10,
    width: '100%',
  },
});