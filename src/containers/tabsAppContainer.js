import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import {ConnectedDashboard} from '../views';
import MyComponent from '../views/products';

export const TopTabsContainer = createMaterialTopTabNavigator(
  {
    Products: {
      screen: MyComponent,
    },
    Dashboard: {
      screen: ConnectedDashboard,
    },
  },
  {
    initialRouteName: 'Dashboard',
    order: ['Products', 'Dashboard'],
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#3a0151',
      inactiveTintColor: '#f1e0f8',
      showIcon: true,
      style: {
        backgroundColor: '#9204cc',
      },
      indicatorStyle: {
        color: '#3a0151',
        backgroundColor: '#3a0151',
      },
    },
  },
);
