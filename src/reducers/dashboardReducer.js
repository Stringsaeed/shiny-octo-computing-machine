import {DASHBOARD_ERROR, DASHBOARD_SUCCESS} from '../constants';

const initialState = {
  isLoading: true,
  dashboardError: false,
  dashboardSuccess: false,
  shipmentCardData: {},
  productCardData: {},
  accountCardData: {},
  settings: {},
  filter: 'Current Week',
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
        filter: action.payload.filter,
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        isLoading: false,
        dashboardError: true,
        filter: action.payload.filter,
      };
    default:
      return {
        ...state,
      };
  }
}
