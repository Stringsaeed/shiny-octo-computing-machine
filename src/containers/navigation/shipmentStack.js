import React from 'react';
import {Icon} from 'native-base';
import {createStackNavigator} from 'react-navigation-stack';

import {
  ConnectedShipmentView,
  ConnectedCreateShipment,
} from '~/containers/screens';

export const ShipmentStack = createStackNavigator(
  {
    shipments: {
      screen: ConnectedShipmentView,
    },
    createShipment: {
      screen: ConnectedCreateShipment,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'shipments',
    navigationOptions: {
      tabBarLabel: 'الشحنات',
      swipeEnabled: true,
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-send" size={30} color={tintColor} />
      ),
      headerForceInset: true,
      headerTintColor: '#9204cc',
    },
  },
);
