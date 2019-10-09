import {createSwitchNavigator} from 'react-navigation';

import {ConnectedLogin} from '../views';
import {TopTabsContainer} from './tabsAppContainer';

export const authSwitcher = createSwitchNavigator(
  {
    app: {
      screen: TopTabsContainer,
    },
    login: {
      screen: ConnectedLogin,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'login',
  },
);
