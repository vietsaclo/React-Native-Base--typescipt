import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-url-polyfill/auto';
import TikopScreen from './scenes/Tikop';
import store from './common/@core/Store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <TikopScreen />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
