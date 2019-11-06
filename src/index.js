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

import store from './store';
import {BrightTheme} from './themes';
import {NavigatedApp} from './containers';
import {ErrorHandler} from './components';

const App = () => {
	return (
		<Provider store={store}>
			<ErrorHandler>
				<RNPProvider theme={BrightTheme}>
					<StatusBar backgroundColor="#9204cc" barStyle="light-content" />
					<SafeAreaView
						style={{flex: 1}}
						forceInset={{horizontal: 'always', top: 'always'}}>
						<NavigatedApp />
					</SafeAreaView>
				</RNPProvider>
			</ErrorHandler>
		</Provider>
	);
};

export default App;
