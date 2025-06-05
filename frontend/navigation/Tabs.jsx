import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/HomePage';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Homepage} />
    </Tab.Navigator>
  );
}
