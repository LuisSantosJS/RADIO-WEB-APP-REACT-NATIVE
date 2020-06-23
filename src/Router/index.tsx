
import * as React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProviderAuth from '../Context/contextPlayer';
import Home from '../pages/Home';
import QueriesMusic from '../pages/QueriesMusic';
import { StatusBar, View } from 'react-native';
import { DrawerContent } from '../component/Drawer';

const Drawer = createDrawerNavigator();
const Router: React.FC = () => {

  return (
    <NavigationContainer>
      <ProviderAuth>
        <StatusBar backgroundColor={'#258E4A'} barStyle={'light-content'} />
        <Drawer.Navigator initialRouteName='Home' drawerContent={props => <DrawerContent {...props} />}  >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="QueriesMusic" component={QueriesMusic} />
        </Drawer.Navigator>
      </ProviderAuth>
    </NavigationContainer>
  );
}

export default Router;