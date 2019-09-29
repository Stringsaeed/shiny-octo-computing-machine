import Odoo from 'react-native-odoo-client';

import {parameters} from '../utils';
import {DASHBOARD_ERROR, DASHBOARD_SUCCESS} from '../constants';

export const fetch_dashboard = filter => async (dispatch, getState) => {
  const {settings} = getState().auth;
  const odoo = new Odoo(settings);
  const inParams = parameters(filter);
  try {
    const response = await odoo.search_read('seller.home.app', inParams, {});

    const shipmentCardData = await {
      total_shipments: response.total_shipments,
      total_shipments_in_transit: response.total_shipments_in_transit,
      total_shipments_shipped: response.total_shipments_shipped,
      total_shipments_rejected: response.total_shipments_rejected,
    };
    const productCardData = await {
      quantity_products_received: response.quantity_products_received,
      quantity_available_products: response.quantity_available_products,
      quantity_actual_sold: response.quantity_actual_sold,
      quantity_scrap_products: response.quantity_scrap_products,
    };
    const accountCardData = await {
      total_price_shipments: response.total_price_shipments,
      total_payments: response.total_payments,
      total_received_payments: response.total_received_payments,
      total_remaining_payments: response.total_remaining_payments,
      total_price_scrap: response.total_price_scrap,
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
  } catch {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        filter: filter,
      },
    });
  }
};
