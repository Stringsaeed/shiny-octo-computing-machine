import Odoo from 'react-native-odoo-client';

import {Filters} from '../utils';
import {
  FETCHING_SHIPMENTS_ERROR,
  FETCHING_SHIPMENTS_SUCCESS,
  UPDATING_SHIPMENT_ERROR,
  UPDATING_SHIPMENT_SUCCESS,
  UPDATING_SHIPMENT_REQUEST,
  REFRESHING_SHIPMENT_REQUEST,
} from '../constants';

export const fetch_shipments = (
  type,
  changingFilter,
  offsetUpdating = 0,
) => async (dispatch, getState) => {
  try {
    if (type === 'update') {
      dispatch({
        type: UPDATING_SHIPMENT_REQUEST,
      });
    } else if (type === 'refresh') {
      dispatch({
        type: REFRESHING_SHIPMENT_REQUEST,
      });
    }
    let fetchLength, actionFilter;
    const {settings} = getState().auth;
    const {filter, limit, length, offset} = getState().shipments;
    const _offset = type === 'update' ? offsetUpdating : offset;
    actionFilter = changingFilter || filter;
    const odoo = new Odoo(settings);
    const inParams = new Filters(actionFilter).getInParam();

    if (type !== 'update') {
      fetchLength = await odoo.search_count('portal.shipments', inParams);
    }
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
      offset: _offset,
      limit: limit,
    });

    dispatch({
      type:
        type !== 'update'
          ? FETCHING_SHIPMENTS_SUCCESS
          : UPDATING_SHIPMENT_SUCCESS,
      payload: shipments,
      meta: {
        offset: _offset,
        length: type !== 'update' ? fetchLength : length,
        filter: actionFilter,
      },
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type:
        type !== 'update' ? FETCHING_SHIPMENTS_ERROR : UPDATING_SHIPMENT_ERROR,
    });
  }
};
