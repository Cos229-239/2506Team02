/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import { COLORS } from './styles';
import LoadingOverlay from './screens/LoadingOverlay';

export default function ImageGenerator({ prompt }) {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const finalPrompt = "one D&D style portrait using this description as a guide  " + prompt + " no text, no logos, no lettering.";
  console.log(finalPrompt);
  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: finalPrompt,
        size: '1024x1024',
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

      setImageUri(response.data.data[0].url);
    } catch (err) {
      console.error('❌ Error generating image:', err.message);
      setImageUri(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateImage();
  }, [prompt]);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingOverlay />
      ) : imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={styles.errorText}>Image could not be generated.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={generateImage}>
        <Text style={styles.buttonText}> Regenerate Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Aclonica',
  },
  errorText: {
    color: '#f00',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
