import {createStackNavigator} from 'react-navigation-stack';
import {ConnectedShipmentView, ConnectedCreateShipment} from '.';

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
