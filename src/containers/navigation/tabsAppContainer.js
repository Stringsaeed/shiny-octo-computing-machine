import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import {ShipmentStack} from '~/containers/navigation/shipmentStack';
import {ConnectedDashboard, ConnectedProductView} from '~/containers/screens';
import {Icon} from '~/components';

export const TopTabsContainer = createMaterialTopTabNavigator(
	{
		Shipments: {
			screen: ShipmentStack,
			navigationOptions: {
				tabBarIcon: ({focused}) => <Icon name="shipment" outlined={!focused} />,
			},
		},
		Dashboard: {
			screen: ConnectedDashboard,
			navigationOptions: {
				tabBarIcon: ({focused}) => (
					<Icon name="dashboard" outlined={!focused} />
				),
				title: 'لوحة البيانات',
				swipeEnabled: true,
				headerForceInset: true,
				headerTintColor: '#9204cc',
			},
		},
		Products: {
			screen: ConnectedProductView,
			navigationOptions: {
				tabBarIcon: ({focused}) => <Icon name="product" outlined={!focused} />,
				title: 'المنتجات',
				swipeEnabled: true,
				headerForceInset: true,
				headerTintColor: '#9204cc',
			},
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
			},
			indicatorStyle: {
				backgroundColor: 'transparent',
			},
		},
	},
);
