import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import {
  ConnectedDashboard,
  ShipmentStack,
  ConnectedProductView,
} from 'containers/screens';

export const TopTabsContainer = createMaterialTopTabNavigator(
  {
    Shipments: {
      screen: ShipmentStack,
    },
    Dashboard: {
      screen: ConnectedDashboard,
    },
    Products: {
      screen: ConnectedProductView,
    },
  },
  {
    initialRouteName: 'Dashboard',
    order: ['Products', 'Shipments', 'Dashboard'],
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#3a0151',
      inactiveTintColor: '#f1e0f8',
      showIcon: true,
      style: {
        backgroundColor: '#f1e0f8',
      },
      indicatorStyle: {
        color: '#3a0151',
        backgroundColor: '#3a0151',
      },
    },
  },
);
