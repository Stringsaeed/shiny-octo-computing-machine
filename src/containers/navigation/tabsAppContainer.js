import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import {ShipmentStack} from '~/containers/navigation/shipmentStack';
import {ConnectedDashboard, ConnectedProductView} from '~/containers/screens';

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
    order: ['Dashboard', 'Shipments', 'Products'],
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#3a0151',
      inactiveTintColor: '#f1e0f8',
      showIcon: true,
      style: {
        backgroundColor: '#FFFFFF',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomColor: '#3a0151',
        borderBottomWidth: 1,
        height: '10%',
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
);