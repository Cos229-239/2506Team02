/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
import { COLORS } from '../styles';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedDatabaseScreen({ navigation }) {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
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
          console.error('Error fetching creations:', error);
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

  const groupByType = (type) =>
    creations.filter((entry) => entry.type === type);

  const renderSection = (title, data, detailScreen) => {
    if (data.length === 0) return null;

    const typeKeyMap = {
      Spells: 'spell',
      Items: 'item',
      Monsters: 'monster',
      Characters: 'character',
    };

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate(detailScreen, { [typeKeyMap[title]]: item })
            }
          >
            <Text style={styles.cardText}>{item.name || 'Unnamed'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.text} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Saved Creations</Text>
        {renderSection('Characters', groupByType('character'), 'Character Details')}
        {renderSection('Monsters', groupByType('monster'), 'Monster Details')}
        {renderSection('Items', groupByType('item'), 'Item Details')}
        {renderSection('Spells', groupByType('spell'), 'Spell Details')}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Aclonica',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Aclonica',
    color: COLORS.text,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Aclonica',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});