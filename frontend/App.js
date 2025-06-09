import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Checkout from './screens/Checkout';
import Menu from './screens/Menu';
import HomeScreen from './screens/HomePage';
import AddFood from './screens/AddFood';
import { useItems } from './hooks/useItems';


const Stack = createNativeStackNavigator();

export default function App() {
  const itemsHook = useItems();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu">
          {props => <Menu {...props} {...itemsHook} />}
        </Stack.Screen>
        <Stack.Screen name="Checkout">
          {props => <Checkout {...props} {...itemsHook} />}
        </Stack.Screen>
        <Stack.Screen name="AddFood">
          {props => <AddFood {...props} {...itemsHook} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
