/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as RNPProvider} from 'react-native-paper';

import store from './src/store';
import AppSwitcher from './src/containers/appContainer';

const App = () => {
  return (
    <Provider store={store}>
      <RNPProvider>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{horizontal: 'always', top: 'always'}}>
          <AppSwitcher />
        </SafeAreaView>
      </RNPProvider>
    </Provider>
  );
};

export default App;
