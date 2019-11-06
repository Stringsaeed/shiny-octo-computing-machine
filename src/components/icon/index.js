import React from 'react';
import PropTypes from 'prop-types';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import fontConfig from '~/assets/selection.json';

const CustomFont = createIconSetFromIcoMoon(
	fontConfig,
	'icomoon',
	'icomoon.ttf',
);

export const Icon = props => {
	switch (props.name) {
		case 'shipment':
			if (props.outlined) {
				return <CustomFont name="shipment_outlined" size={24} />;
			} else {
				return <CustomFont name="shipment" size={24} />;
			}
		case 'product':
			if (props.outlined) {
				return <CustomFont name="box_outlined" size={24} />;
			} else {
				return <CustomFont name="box" size={24} />;
			}
		case 'dashboard':
			if (props.outlined) {
				return <CustomFont name="dashboard_outlined" size={24} />;
			}
			return <CustomFont name="dashboard" size={24} />;
		default:
			return <CustomFont name="seller" size={24} />;
	}
};

Icon.defaultProps = {
	name: 'seller',
	outlined: false,
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	outlined: PropTypes.bool,
};
