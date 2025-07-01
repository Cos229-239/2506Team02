import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { OPENAI_API_KEY } from '@env';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DisplayItemsInfo from './Items';
import { ITEM_CREATION_PROMPT } from './prompts';
import { GLOBAL_STYLES, COLORS } from './styles';
import itemOptions from './data/itemOptions'
import LoadingOverlay from './LoadingOverlay';
export default function ItemScreen() { 
  const navigation = useNavigation();   
  const [selectedItemType, setSelectedItemType] = useState('');
  const [selectedMagicItem, setSelectedMagicItem] = useState('');
  const [selectedDamageType, setSelectedDamageType] = useState('');
  const [selectedDamage, setSelectedDamage] = useState('');
  const [selectedProperties, setSelectedProperties] = useState('');
 const [item, setItem] = useState(null);
const [isLoading, setIsLoading] = useState(false);


  const handleOutput = async () => {
  if (isGenerateDisabled) {
    Alert.alert("Missing Info", "Please select all options before generating.");
    return;
  }

  setIsLoading(true);

  const interpolatedPrompt = ITEM_CREATION_PROMPT
    .replace(/\$\{newItem.itemType\}/g, selectedItemType)
    .replace(/\$\{MagicItem\}/g, selectedMagicItem)
    .replace(/\$\{newItem.damageType\}/g, selectedDamageType)
    .replace(/\$\{newItem.damage\}/g, selectedDamage)
    .replace(/\$\{newItem.properties\}/g, selectedProperties);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: ITEM_CREATION_PROMPT },
          { role: "user", content: interpolatedPrompt }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      try {
        const raw = data.choices[0].message?.content;
        const generated = JSON.parse(raw);

        navigation.navigate('Item Details', {
          item: {
            itemType: selectedItemType,
            MagicItem: selectedMagicItem,
            damageType: selectedDamageType,
            damage: selectedDamage,
            properties: selectedProperties,
            ...generated,
          },
        });
      } catch (err) {
        console.error("Failed to parse JSON:", err, data.choices[0].message?.content);
        Alert.alert("Error", "Item generation failed. Try again.");
      }
    } else {
      Alert.alert("Error", "OpenAI did not return a valid response.");
    }
  } catch (fetchErr) {
    console.error("API request failed:", fetchErr);
    Alert.alert("Error", "Failed to fetch from OpenAI. Try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleClear = () => {
    setSelectedItemType('');
    setSelectedMagicItem('');
    setSelectedDamageType('');
    setSelectedDamage('');
    setSelectedProperties('');
    setItem(null);
  };

  const isGenerateDisabled = !selectedItemType || !selectedMagicItem || !selectedDamageType || !selectedDamage || !selectedProperties;

  return (
        isLoading ? <LoadingOverlay /> :
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={GLOBAL_STYLES.screen}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Loot & Lore</Text>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.label}>Item Type</Text>

            <SelectList setSelected={setSelectedItemType} data={itemOptions.itemType} placeholder="Item Type" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

            <Text style={styles.label}>Magic Item</Text>
            <SelectList setSelected={selectedMagicItem} data={itemOptions.MagicItem} placeholder="Magic Item" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

            <Text style={styles.label}>Damage Type</Text>
            <SelectList setSelected={selectedDamageType} data={itemOptions.damageType} placeholder="Damage Type" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

            <Text style={styles.label}>Damage</Text>
            <SelectList setSelected={selectedDamage} data={itemOptions.damage} placeholder="Damage" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

            <Text style={styles.label}>Properties</Text>
            <SelectList setSelected={selectedProperties} data={itemOptions.properties} placeholder="Properties" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
  onPress={handleOutput}
  style={[styles.generateButton, (isGenerateDisabled || isLoading) && { opacity: 0.5 }]}
  disabled={isGenerateDisabled || isLoading}
>
  <Text style={styles.buttonText}>Generate</Text>
</TouchableOpacity>
            </View>

            {spell && <DisplayItemsInfo item={item} />}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: COLORS.text,
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
    color: '#f4a300',
    fontSize: 20,
    marginVertical: 5,
  },
  dropdown: {
    backgroundColor: COLORS.button,
    borderColor: '#f4a300',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownInput: {
    color: '#000000',
  },
  dropdownList: {
    backgroundColor: COLORS.button,
    borderColor: '#f4a300',
  },
  dropdownItem: {
    borderBottomColor: '#f4a300',
  },
  dropdownText: {
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  generateButton: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});