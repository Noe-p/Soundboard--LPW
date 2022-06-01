import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { HomePage } from './src/pages/HomePage';
import store from './store';

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar />
        <HomePage />
      </PersistGate>
    </Provider>
  );
}
