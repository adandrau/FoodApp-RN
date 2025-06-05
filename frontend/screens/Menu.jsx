import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'http://192.168.56.1:3000';

export default function Menu({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods`, { timeout: 5000 });
        setFoods(res.data);
      } catch (err) {
        setError(err.message || 'Error fetching foods');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.container}>
      <FlatList
        data={foods}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
    <Footer
        leftLabel="Cancel"
        onLeft={() => navigation.navigate('Home')}
        rightLabel="Checkout"
        onRight={() => navigation.navigate('Checkout')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, marginTop: 40 },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
  },
  emoji: { fontSize: 90, width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  descripcion: { color: '#555', marginTop: 4, fontStyle: 'italic' },
  price: { color: 'green', fontWeight: 'bold', marginTop: 4 }
});