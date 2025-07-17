/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OPENAI_API_KEY } from '@env';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ITEM_CREATION_PROMPT } from '../prompts';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
import itemOptions from '../data/itemOptions';
import LoadingOverlay from './LoadingOverlay';

export default function ItemDetailsScreen() {
  const navigation = useNavigation();
  const { theme, boldText } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const [selectedItemType, setSelectedItemType] = useState('');
  const [selectedMagicItem, setSelectedMagicItem] = useState('');
  const [selectedDamageType, setSelectedDamageType] = useState('');
  const [selectedDamageAmount, setSelectedDamageAmount] = useState('');
  const [selectedProperties, setSelectedProperties] = useState('');
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isGenerateDisabled =
    !selectedItemType ||
    !selectedMagicItem ||
    !selectedDamageType ||
    !selectedDamageAmount ||
    !selectedProperties;

  const handleOutput = async () => {
    if (isGenerateDisabled) {
      Alert.alert('Missing Info', 'Please select all options before generating.');
      return;
    }

    setIsLoading(true);

    const interpolatedPrompt = ITEM_CREATION_PROMPT
      .replace(/\$\{item.itemType\}/g, selectedItemType)
      .replace(/\$\{item.magicItem\}/g, selectedMagicItem)
      .replace(/\$\{item.damageType\}/g, selectedDamageType)
      .replace(/\$\{item.damageAmount\}/g, selectedDamageAmount)
      .replace(/\$\{item.properties\}/g, selectedProperties);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: ITEM_CREATION_PROMPT },
            { role: 'user', content: interpolatedPrompt },
          ],
          temperature: 0.8,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        try {
          const raw = data.choices[0].message?.content;
          const generated = JSON.parse(raw);

          navigation.navigate("Item Details", {
            item: {
              itemType: selectedItemType,
              magicItem: selectedMagicItem,
              damageType: selectedDamageType,
              damageAmount: selectedDamageAmount,
              properties: Array.isArray(selectedProperties) ? selectedProperties : [selectedProperties],
              ...generated,
            },
          });
        } catch (err) {
          console.error('Failed to parse JSON:', err, data.choices[0].message?.content);
          Alert.alert('Error', 'Item generation failed. Try again.');
        }
      } else {
        Alert.alert('Error', 'OpenAI did not return a valid response.');
      }
    } catch (fetchErr) {
      console.error('API request failed:', fetchErr);
      Alert.alert('Error', 'Failed to fetch from OpenAI. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Items' }], 
  });
};

  return isLoading ? (
    <LoadingOverlay />
  ) : (
      <SafeAreaView style={globalStyles.screen}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text
                style={[
                  styles.title,
                  { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' },
                ]}
              >
                Loot & Lore
              </Text>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            {/* Item Type Dropdown */}
            <Text style={[styles.label, { color: themeColors.text }]}>Item Type</Text>
            <SelectList
              setSelected={setSelectedItemType}
              data={itemOptions.itemType}
              placeholder="Item Type"
              boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
              inputStyles={[styles.dropdownInput, { color: themeColors.text }]}
              dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
              dropdownItemStyles={styles.dropdownItem}
              dropdownTextStyles={[styles.dropdownText, { color: themeColors.text }]}
            />

            {/* Magic Item */}
            <Text style={[styles.label, { color: themeColors.text }]}>Magic Item</Text>
            <SelectList
              setSelected={setSelectedMagicItem}
              data={itemOptions.magicItem}
              placeholder="Magic Item"
              boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
              inputStyles={[styles.dropdownInput, { color: themeColors.text }]}
              dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
              dropdownItemStyles={styles.dropdownItem}
              dropdownTextStyles={[styles.dropdownText, { color: themeColors.text }]}
            />

            {/* Damage Type */}
            <Text style={[styles.label, { color: themeColors.text }]}>Damage Type</Text>
            <SelectList
              setSelected={setSelectedDamageType}
              data={itemOptions.damageType}
              placeholder="Damage Type"
              boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
              inputStyles={[styles.dropdownInput, { color: themeColors.text }]}
              dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
              dropdownItemStyles={styles.dropdownItem}
              dropdownTextStyles={[styles.dropdownText, { color: themeColors.text }]}
            />

            {/* Damage Amount */}
            <Text style={[styles.label, { color: themeColors.text }]}>Damage Amount</Text>
            <SelectList
              setSelected={setSelectedDamageAmount}
              data={itemOptions.damageAmount}
              placeholder="Damage Amount"
              boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
              inputStyles={[styles.dropdownInput, { color: themeColors.text }]}
              dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
              dropdownItemStyles={styles.dropdownItem}
              dropdownTextStyles={[styles.dropdownText, { color: themeColors.text }]}
            />

            {/* Properties */}
            <Text style={[styles.label, { color: themeColors.text }]}>Properties</Text>
            <SelectList
              setSelected={setSelectedProperties}
              data={itemOptions.properties}
              placeholder="Properties"
              boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
              inputStyles={[styles.dropdownInput, { color: themeColors.text }]}
              dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
              dropdownItemStyles={styles.dropdownItem}
              dropdownTextStyles={[styles.dropdownText, { color: themeColors.text }]}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClear} style={[styles.clearButton, { backgroundColor: themeColors.button }]}>
                <Text style={[styles.buttonText, { color: themeColors.text }]}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOutput}
                style={[styles.generateButton, { backgroundColor: themeColors.button }, isGenerateDisabled && { opacity: 0.5 }]}
                disabled={isGenerateDisabled}
              >
                <Text style={[styles.buttonText, { color: themeColors.text }]}>Generate</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Aclonica',
    marginTop: 20,
    marginBottom: 4,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownInput: {},
  dropdownList: {},
  dropdownItem: {
    borderBottomWidth: 1,
  },
  dropdownText: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  clearButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  generateButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
