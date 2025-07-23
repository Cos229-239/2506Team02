/* eslint-disable react/prop-types */
import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
import OtherBackButton from '../OtherBackButton';

export default function PrivateMonstersScreen() {
  const navigation = useNavigation();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, boldText } = useContext(ThemeContext);

  const styles = getGlobalStyles(theme);
  const colors = THEMES[theme] || THEMES.default;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchCreations = async () => {
        try {
          setLoading(true);
          const user = auth.currentUser;
          if (!user) return;
          const snapshot = await getDocs(
            collection(db, 'users', user.uid, 'creations')
          );
          if (isActive) {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCreations(data);
          }
        } catch (error) {
          console.log('Error fetching monsters:', error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchCreations();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const monsters = creations.filter((entry) => entry.type === 'monster');

  if (loading) {
    return (
      <View style={[localStyles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[localStyles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <Text
          style={[
            styles.header,
            {
              color: colors.text,
              fontWeight: boldText ? 'bold' : 'normal',
              marginBottom: 20,
              textAlign: 'center',
            },
          ]}
        >
          Your Saved Monsters
        </Text>

        {monsters.length === 0 ? (
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontWeight: boldText ? 'bold' : 'normal',
                textAlign: 'center',
              },
            ]}
          >
            No monsters saved.
          </Text>
        ) : (
          monsters.map((monster) => (
            <TouchableOpacity
              key={monster.id}
              style={[localStyles.card, { backgroundColor: colors.button }]}
              onPress={() => navigation.navigate('Monster Display', { monster })}
            >
              <Text style={[styles.text, { color: colors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
                {monster.name || 'Unnamed'}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View
        style={[
          localStyles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.text },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'center' }}>
          <OtherBackButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    width: '90%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  footer: {
    borderTopWidth: 1,
    padding: 10,
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});