import React, { useContext } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles } from '../styles';
import BackButton from '../BackButton';

export default function TermsAndAgreementScreen() {
  const { theme, boldText } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);
  const colors = theme;

  const terms = [
    '1. You agree to use this app in accordance with all applicable laws and regulations.',
    '2. You shall not misuse or interfere with the app’s functionality.',
    '3. Your data may be stored securely and used for app functionality purposes.',
    '4. We do not share your personal data without consent.',
    '5. We are not liable for any loss or damage resulting from app usage.',
    '6. Terms may be updated periodically. Continued use implies acceptance.',
    '7. You are responsible for maintaining the confidentiality of your login credentials.',
    '8. All content is owned by the app creator unless otherwise specified.',
    '9. You must not attempt to reverse-engineer or hack the app.',
    '10. Violation of these terms may result in access restrictions or termination.',
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Removed header title text */}
        {terms.map((term, index) => (
          <Text
            key={index}
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: boldText ? 'bold' : 'normal',
              marginVertical: 8,
              fontFamily: 'Aclonica',
            }}
          >
            {term}
          </Text>
        ))}
      </ScrollView>

      {/* 🔽 Back button pinned to bottom with theme colors */}
      <View
        style={[
          localStyles.footer,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.text,
          },
        ]}
      >
        <BackButton />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    padding: 10,
  },
});
