import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {authSwitcher} from 'containers/switchContainer';

import {translate, setI18nConfig} from 'i18n';

const AppContainer = createAppContainer(authSwitcher);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: 'en',
    };
    this.setLocale = this.setLocale.bind(this);
  }

  setLocale = locale => {
    setI18nConfig(locale);
    this.setState({locale: locale});
  };

  render() {
    return (
      <AppContainer
        screenProps={{
          t: translate,
          locale: this.state.locale,
          setLocale: this.setLocale,
        }}
      />
    );
  }
}
