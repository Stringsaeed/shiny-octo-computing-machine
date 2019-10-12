import {
  UPDATE_CREATE_SHIPMENT_PRODUCTS_REQUEST,
  UPDATE_CREATE_SHIPMENT_PRODUCTS_SUCCESS,
  UPDATE_CREATE_SHIPMENT_PRODUCTS_FAILED,
  FETCH_CREATE_SHIPMENT_DATA_FAILED,
  FETCH_CREATE_SHIPMENT_DATA_SUCCESS,
} from '../constants';

const initialState = {
  products: [],
  isLoading: true,
  isSending: false,
  disabled: true,
  responsible: [],
  isAdmin: false,
  offset: 0,
  limit: 80,
  isUpdating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_SHIPMENT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        isAdmin: action.meta.isAdmin,
        disabled: !action.meta.isAdmin,
        responsible: action.meta.responsible,
      };
    case FETCH_CREATE_SHIPMENT_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_CREATE_SHIPMENT_PRODUCTS_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case UPDATE_CREATE_SHIPMENT_PRODUCTS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        products: [...state.products, ...action.payload],
        offset: action.meta.offset,
      };
    case UPDATE_CREATE_SHIPMENT_PRODUCTS_FAILED:
      return {
        ...state,
        isUpdating: false,
      };
    default:
      return state;
  }
};
