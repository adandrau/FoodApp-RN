import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Checkout({ navigation }) {
  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Checkout Screen</Text>
        {/* TODO: display selected products + subtotal */}
      </View>

      <Footer
        leftLabel="Cancel"
        onLeft={() => navigation.goBack()}
        rightLabel="Place Order"
        onRight={() => alert('Order Placed!')}
      />
    </View>
  );
}
