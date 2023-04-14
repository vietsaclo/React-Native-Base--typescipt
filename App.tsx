import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-url-polyfill/auto';
import TikopScreen from './scenes/Tikop';
import store from './common/@core/Store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';

const Drawer = createDrawerNavigator();

function Tmp(): JSX.Element {
  return (
    <View>
      <Text>vietsaclo@gmail.com</Text>
    </View>
  );
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Tikop-01">
            <Drawer.Screen name="Tikop Remaining" component={TikopScreen} />
            <Drawer.Screen name="My Profile" component={Tmp} />
            <Drawer.Screen name="About" component={Tmp} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
