import {createSwitchNavigator} from 'react-navigation';

import LoginView from '../views/login';
import DashboardView from '../views/dashboard';

export const authSwitcher = createSwitchNavigator(
  {
    app: {
      screen: DashboardView,
      navigationOptions: {
        header: null,
      },
    },
    login: {
      screen: LoginView,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'login',
  },
);
