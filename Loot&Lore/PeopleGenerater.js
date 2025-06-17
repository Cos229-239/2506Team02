import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import { PEOPLE_CREATION_PROMPT } from './PeoplePrompts';
import PeopleCard from './PeopleCard';
import { GLOBAL_STYLES } from './styles';

export default function PeopleGenerater({ navigation }) {
  const [input, setInput] = useState('');
  const [people, setPeople] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: PEOPLE_CREATION_PROMPT },
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const message = res.data.choices[0].message.content;
      const parsed = JSON.parse(message);
      const newPeople = new People(parsed);
      setPeople(newPeople);
      
      // Navigate to the new page with character data
      navigation.navigate('PeopleCard', { character: parsed });

    } catch (error) {
      console.error('❌ Error generating person:', error.message);
    }

    setLoading(false);
    setInput('newPeople');
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
              {loading ? (
                <Text style={GLOBAL_STYLES.buttonText}>Loading...</Text>
              ) : people ? (
                <PeopleCard people={people} />
              ) : (
                <Text style={GLOBAL_STYLES.buttonText}>No monster yet.</Text>
              )}
            </ScrollView>
            <TouchableOpacity
              style={GLOBAL_STYLES.button}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={GLOBAL_STYLES.buttonText}>
                {loading ? 'Generating...' : 'Send'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}