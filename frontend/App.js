import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './components/Menu'; 
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

export default function App() {
  return (
    <NavigationContainer>
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Menu />
    </View>
      <Tabs />
    </NavigationContainer>
  );
};
