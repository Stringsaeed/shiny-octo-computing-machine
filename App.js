/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Provider as RNPProvider} from 'react-native-paper';

import store from './src/store';
import AppSwitcher from './src/containers/appContainer';

const App = () => {
  return (
    <Provider store={store}>
      <RNPProvider>
        <StatusBar barStyle="dark-content" />
        <AppSwitcher />
      </RNPProvider>
    </Provider>
  );
};

export default App;
