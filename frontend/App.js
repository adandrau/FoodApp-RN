import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Checkout from './screens/Checkout';
import Menu from './screens/Menu';
import HomeScreen from './screens/HomePage';
import AddFood from './screens/AddFood';
import { useItems } from './hooks/useItems';
import React, { useEffect } from 'react';
import storage from './context/storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const itemsHook = useItems();

  useEffect(() => {
  storage.load({ key: 'carrito' })
    .then(savedCart => {
      // Actualiza foods con las cantidades guardadas
      setFoods(foods.map(f => {
        const found = savedCart.find(c => c.id === f.id);
        return found ? { ...f, carrito: found.carrito } : f;
      }));
    })
    .catch(() => {}); // Si no hay carrito guardado, no hace nada
    }, []);

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
