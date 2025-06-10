import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import Footer from '../components/Footer';
import storage from '../context/storage';

export default function Checkout({ navigation, placeOrder }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    storage.load({ key: 'carrito' })
      .then(savedCart => setCart(savedCart))
      .catch(() => setCart([]));
  }, []);

  const handleRemove = (item) => {
    const newCart = cart.filter(f => f.id !== item.id);
    setCart(newCart);
    storage.save({
      key: 'carrito',
      data: newCart,
    });
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => handleRemove(item)}
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.itemPressed
      ]}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>
          x {item.carrito} - ${item.carrito * item.price}
        </Text>
      </View>
      <Text style={styles.remove}>❌</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos en el carrito.</Text>}
      />
      <Text style={styles.total}>Total: ${cart.reduce((sum, item) => sum + item.price * item.carrito, 0)}</Text>
      <Footer 
        leftLabel="Cancel"
        onLeft={() => navigation.navigate('Home')}
        rightLabel="Place Order"
        onRight={() => placeOrder()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemPressed: {
    backgroundColor: '#ececec',
  },
  emoji: {
    fontSize: 40,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  remove: {
    fontSize: 18,
    color: '#c00',
    marginLeft: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
    color: '#000',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginTop: 20,
  },
});