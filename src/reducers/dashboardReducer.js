import {
  DASHBOARD_ERROR,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
} from '../constants';

const initialState = {
  isLoading: true,
  dashboardError: false,
  dashboardSuccess: false,
  shipmentCardData: {
    total: 0,
    in_transit: 0,
    shipped: 0,
    rejected: 0,
  },
  productCardData: {},
  accountCardData: {},
  filter: 'Current Week',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
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
