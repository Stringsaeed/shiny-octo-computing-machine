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
import {Provider as RNPProvider, DefaultTheme} from 'react-native-paper';

import store from './store';
import {NavigatedApp} from './containers';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9204cc',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <RNPProvider theme={theme}>
        <StatusBar backgroundColor="#9204cc" barStyle="light-content" />
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{horizontal: 'always', top: 'always'}}>
          <NavigatedApp />
        </SafeAreaView>
      </RNPProvider>
    </Provider>
  );
};

export default App;
