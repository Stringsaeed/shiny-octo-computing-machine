import Odoo from 'react-native-odoo-client';

import {parameters} from '../utils';
import {DASHBOARD_ERROR, DASHBOARD_SUCCESS} from '../constants';

export const fetch_dashboard = filter => async (dispatch, getState) => {
  filter = filter || getState().dashboard.filter;
  const {settings} = getState().auth;
  const odoo = new Odoo(settings);
  const inParams = parameters(filter);
  try {
    const response = await odoo.search_read('seller.home.app', inParams, {});
    const shipmentCardData = await {
      total_shipments: response[0].total_shipments,
      total_shipments_in_transit: response[0].total_shipments_in_transit,
      total_shipments_shipped: response[0].total_shipments_shipped,
      total_shipments_rejected: response[0].total_shipments_rejected,
    };
    const productCardData = await {
      quantity_products_received: response[0].quantity_products_received,
      quantity_available_products: response[0].quantity_available_products,
      quantity_actual_sold: response[0].quantity_actual_sold,
      quantity_scrap_products: response[0].quantity_scrap_products,
    };
    const accountCardData = await {
      total_price_shipments: response[0].total_price_shipments,
      total_payments: response[0].total_payments,
      total_received_payments: response[0].total_received_payments,
      total_remaining_payments: response[0].total_remaining_payments,
      total_price_scrap: response[0].total_price_scrap,
    };
    console.log(response);
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
