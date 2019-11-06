import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {addEventListener, removeEventListener} from 'react-native-localize';

import {translate, setI18nConfig} from '~/i18n';
import {authSwitcher} from '~/containers/navigation/switchContainer';

const AppContainer = createAppContainer(authSwitcher);

export class NavigatedApp extends Component {
	constructor(props) {
		super(props);
		setI18nConfig();
	}
	componentDidMount() {
		addEventListener('change', this.handleLocalizationChange);
	}

	componentWillUnmount() {
		removeEventListener('change', this.handleLocalizationChange);
	}

	handleLocalizationChange = () => {
		setI18nConfig();
		this.forceUpdate();
	};

	render() {
		return (
			<AppContainer
				screenProps={{
					t: translate,
				}}
			/>
		);
	}
}
