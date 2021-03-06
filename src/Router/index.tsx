
import * as React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProviderAuth from '../Context/contextPlayer';
import Home from '../pages/Home';
import Info from '../pages/Info';
import Auth from '../pages/Auth';
import Chat from '../pages/Chat';
import QueriesMusic from '../pages/QueriesMusic';
import { StatusBar, View } from 'react-native';
import { DrawerContent } from '../component/Drawer';
import ProviderSignal from '../Context/contextSignal';
const Drawer = createDrawerNavigator();
const Router: React.FC = () => {

  return (
    <NavigationContainer>
      <ProviderAuth>
        <ProviderSignal>
          <StatusBar backgroundColor={'#258E4A'} barStyle={'light-content'} />
          <Drawer.Navigator initialRouteName='Home' drawerContent={props => <DrawerContent {...props} />}  >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="QueriesMusic" component={QueriesMusic} />
            <Drawer.Screen name="Info" component={Info} />
            <Drawer.Screen name="Auth" component={Auth} />
            <Drawer.Screen name="Chat" component={Chat} />
          </Drawer.Navigator>
        </ProviderSignal>
      </ProviderAuth>
    </NavigationContainer>
  );
}

export default Router;