import {DASHBOARD_SUCCESS, DASHBOARD_ERROR} from '../constants';

const initialState = {
  isLoading: true,
  dashboardError: false,
  dashboardSuccess: false,
  shipmentCardData: {},
  productCardData: {},
  accountCardData: {},
  settings: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dashboardSuccess: true,
        shipmentCardData: action.payload.shipmentCard,
        productCardData: action.payload.productCard,
        accountCardData: action.payload.accountCard,
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        isLoading: false,
        dashboardError: true,
      };
    default:
      return {
        ...state,
      };
  }
}
