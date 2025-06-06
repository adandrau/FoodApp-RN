import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../components/Footer';


export default function Menu({ navigation, foods, loading, error, handleUpdate }) {

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.izq}>
    <Text style={styles.offerText}>${Math.round(item.price * 1.1)}</Text>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => handleUpdate(item, -1)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.carrito}</Text>
        <TouchableOpacity
          onPress={() => handleUpdate(item, 1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
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
  price: { color: 'green', fontWeight: 'bold', marginTop: 4 },
  buttons: { flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10 },
  button: {
    backgroundColor: '#4CAFAF', // Green background
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerCircle: {
  backgroundColor: '#e53935', // rojo oferta
  borderRadius: 40,
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
  marginLeft: 0,
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
offerText: {
  color: '#e53935',
  fontWeight: 'bold',
  fontSize: 16,
  textDecorationLine: 'line-through', // tachado para precio original
  textDecorationStyle: 'solid', // estilo de tachado
  textDecorationThickness: 13, // grosor del tachado
  textDecorationColor: '#fff', // color del tachado
  marginLeft: 8,
},
  buttonText: { fontSize: 20, fontWeight: 'bold' },
  qty: { fontSize: 18, marginHorizontal: 8 },
  izq: { alignItems: 'center', justifyContent: 'center' },
});