import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'https://ee5c-2800-ac-21-9b1f-5088-6d03-229b-7c75.ngrok-free.app';

export default function Menu() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/foods`)
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.descripcion}>${item.descripcion}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FoodApp </Text>
      <FlatList
        data={foods}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
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