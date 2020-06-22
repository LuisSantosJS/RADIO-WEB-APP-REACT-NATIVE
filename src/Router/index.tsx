
import * as React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home';
const Drawer = createDrawerNavigator();
const Router: React.FC = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Router;