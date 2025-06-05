import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View >
      <Text>Pantalla de inicio</Text>
      <Button title={"Go to Menu"} onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}
