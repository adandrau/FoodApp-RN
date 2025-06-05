import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Footer({ leftLabel, onLeft, rightLabel, onRight }) {
  return (
    <View style={styles.footer}>
      <Button title={leftLabel} onPress={onLeft} />
      <Button title={rightLabel} onPress={onRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
