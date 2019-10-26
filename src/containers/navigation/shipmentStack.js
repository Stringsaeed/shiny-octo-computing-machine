import {createStackNavigator} from 'react-navigation-stack';

import {
  ConnectedShipmentView,
  ConnectedCreateShipment,
} from 'containers/screens';

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
  },
);
