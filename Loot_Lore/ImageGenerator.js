/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { View, Image, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import { ThemeContext } from './ThemeContext'; // Import your ThemeContext
import { getGlobalStyles, THEMES } from './styles'; // Import your global styles
import LoadingOverlay from './screens/LoadingOverlay';

export default function ImageGenerator({ prompt, onImageGenerated }) {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);

  const finalPrompt = `
  A highly detailed Dungeons & Dragons style portrait of ${prompt}.
  No text, no letters, no writing, no logos, no symbols, no watermarks, no captions, no typography, no signatures anywhere.
  Background should be plain or artistic with no characters, numbers, or text.
  `;

  const { theme, boldText } = useContext(ThemeContext);  
  const globalStyles = getGlobalStyles(theme);  
  const themeColors = THEMES[theme];  
  
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

      const imageUrl = response.data.data[0].url;
      setImageUri(imageUrl);

      // Notify parent
      if (onImageGenerated) {
        onImageGenerated(imageUrl);
      }

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
    <View style={[globalStyles.screen, { alignItems: 'center', marginBottom: 20 }]}>
      {loading ? (
        <LoadingOverlay />
      ) : imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[globalStyles.image, { width: 300, height: 300, borderRadius: 10, marginBottom: 10 }]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[globalStyles.buttonText, { color: themeColors.text, fontStyle: 'italic', marginBottom: 10 }]}>
          Image could not be generated.
        </Text>
      )}

      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: themeColors.button, marginTop: 10 }]}
        onPress={generateImage}
      >
        <Text style={[globalStyles.buttonText, { color: themeColors.text }]}>Regenerate Image</Text>
      </TouchableOpacity>
    </View>
  );
}