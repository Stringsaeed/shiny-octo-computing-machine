import Odoo from 'react-native-odoo-client';

import {parameters} from '../utils';
import {
  DASHBOARD_ERROR,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
} from '../constants';

export const fetch_dashboard = filter => async (dispatch, getState) => {
  dispatch({
    type: DASHBOARD_REQUEST,
  });
  filter = filter || getState().dashboard.filter;
  const {settings} = getState().auth;
  const odoo = new Odoo(settings);
  const inParams = parameters(filter);
  try {
    const response = await odoo.search_read('seller.home.app', inParams, {});
    const shipmentCardData = {
      total: response[0].total_shipments,
      in_transit: response[0].total_shipments_in_transit,
      shipped: response[0].total_shipments_shipped,
      rejected: response[0].total_shipments_rejected,
    };
    const productCardData = {
      received: response[0].quantity_products_received,
      available: response[0].quantity_available_products,
      sold: response[0].quantity_actual_sold,
      scrap: response[0].quantity_scrap_products,
    };
    const accountCardData = {
      shipments: response[0].total_price_shipments,
      payments: response[0].total_payments,
      received: response[0].total_received_payments,
      remaining: response[0].total_remaining_payments,
      scrap: response[0].total_price_scrap,
    };

    dispatch({
      type: DASHBOARD_SUCCESS,
      payload: {
        shipmentCard: shipmentCardData,
        productCard: productCardData,
        accountCard: accountCardData,
        filter: filter,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        filter: filter,
      },
    });
  }
};
