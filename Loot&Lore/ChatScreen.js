import React, { useState } from 'react';
import {
  View,
  TextInput,
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
import { MONSTER_CREATION_PROMPT } from './prompts';
import { Monster } from './Monster';
import MonsterCard from './MonsterCard';
import { GLOBAL_STYLES } from './styles';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [monster, setMonster] = useState(null);
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
            { role: 'system', content: MONSTER_CREATION_PROMPT },
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
      const newMonster = new Monster(parsed);
      setMonster(newMonster);

    } catch (error) {
      console.error('❌ Error generating monster:', error.message);
    }

    setLoading(false);
    setInput('');
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
              ) : monster ? (
                <>
                  <MonsterCard monster={monster} />
                </>
              ) : (
                <Text style={GLOBAL_STYLES.buttonText}>No monster yet.</Text>
              )}
            </ScrollView>

            <TextInput
              style={GLOBAL_STYLES.input}
              placeholder="Enter your Monster..."
              placeholderTextColor="#aaa"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={GLOBAL_STYLES.button} onPress={handleSend} disabled={loading}>
              <Text style={GLOBAL_STYLES.buttonText}>{loading ? 'Generating...' : 'Send'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
