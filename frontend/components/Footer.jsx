import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Footer({ leftLabel, rightLabel, onLeft, onRight }) {
  return (
    <View style={styles.footer}>
      <Pressable style={[styles.button, styles.cancel]} onPress={onLeft}>
        <Text style={styles.buttonText}>{leftLabel}</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.checkout]} onPress={onRight}>
        <Text style={styles.buttonText}>{rightLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  cancel: {
    backgroundColor: '#E0E0E0',
  },
  checkout: {
    backgroundColor: '#6200EE',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
