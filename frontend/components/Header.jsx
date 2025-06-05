import React from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer?.() || alert('Abrir menú')}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
    safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  logo: {
    width: 120,
    height: 40,
  },
});
