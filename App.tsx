import React from 'react';
import { Provider } from 'react-redux';
import Store from './common/Store';
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-url-polyfill/auto';
import Tikop from './scenes/Tikop';

function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <Tikop />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
