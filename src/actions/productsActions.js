import Odoo from 'react-native-odoo-client';

import {Filters} from '../utils';
import {
	FETCHING_PRODUCTS_SUCCESS,
	FETCHING_PRODUCTS_ERROR,
	UPDATING_PRODUCTS_ERROR,
	UPDATING_PRODUCTS_REQUEST,
	UPDATING_PRODUCTS_SUCCESS,
	REFRESHING_PRODUCTS_REQUEST,
} from '../constants';

export const fetchProducts = (type, offsetUpdating = 0) => async (
	dispatch,
	getState,
) => {
	try {
		if (type === 'update') {
			dispatch({
				type: UPDATING_PRODUCTS_REQUEST,
			});
		} else if (type === 'refresh') {
			dispatch({
				type: REFRESHING_PRODUCTS_REQUEST,
			});
		}
		let fetchLength;
		const {settings} = getState().auth;
		const {limit, length, offset} = getState().shipments;
		const _offset = type === 'update' ? offsetUpdating : offset;
		const odoo = new Odoo(settings);
		const inParams = new Filters('ALL').getInParam();

		if (type !== 'update') {
			fetchLength = await odoo.search_count('product.template', inParams);
			console.log(fetchLength);
		}
		inParams.push([
			'name',
			'standard_price',
			'categ_id',
			'removal_time',
			'portal_state',
			'barcode',
		]);
		const products = await odoo.search_read('product.template', inParams, {
			offset: _offset,
			limit: limit,
		});

		dispatch({
			type:
				type !== 'update'
					? FETCHING_PRODUCTS_SUCCESS
					: UPDATING_PRODUCTS_SUCCESS,
			payload: products,
			meta: {
				offset: _offset,
				length: type !== 'update' ? fetchLength : length,
			},
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type:
				type !== 'update' ? FETCHING_PRODUCTS_ERROR : UPDATING_PRODUCTS_ERROR,
		});
	}
};
