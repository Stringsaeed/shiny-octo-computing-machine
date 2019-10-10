import Odoo from 'react-native-odoo-client';

import {Filters} from '../utils';
import {
  FETCHING_SHIPMENTS_ERROR,
  FETCHING_SHIPMENTS_SUCCESS,
  UPDATING_SHIPMENT_ERROR,
  UPDATING_SHIPMENT_SUCCESS,
  UPDATING_SHIPMENT_REQUEST,
} from '../constants';

export const fetch_shipment = (type: boolean, offsetUpdating: number) => async (
  dispatch,
  getState,
) => {
  try {
    if (type === 'update') {
      dispatch({
        type: UPDATING_SHIPMENT_REQUEST,
      });
    }
    const {filter, limit} = getState().shipments;
    const offset =
      type === 'update' ? offsetUpdating : getState().shipments.offset;

    const odoo = new Odoo(this.state.settings);
    const inParams = new Filters(filter).getInParam();
    inParams.push([
      'product_id',
      'picking_id',
      'quantity',
      'standard_price',
      'create_date',
      'state',
      'barcode',
    ]);
    const shipments = await odoo.search_read('portal.shipments', inParams, {
      offset: offset,
      limit: limit,
    });
    dispatch({
      type:
        type === 'update'
          ? FETCHING_SHIPMENTS_SUCCESS
          : UPDATING_SHIPMENT_SUCCESS,
      payload: shipments,
      meta: {
        offset: offset,
      },
    });
  } catch (e) {
    dispatch({
      type:
        type === 'update' ? FETCHING_SHIPMENTS_ERROR : UPDATING_SHIPMENT_ERROR,
    });
  }
};
