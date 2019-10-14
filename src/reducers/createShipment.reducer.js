import {
  UPDATE_CREATE_SHIPMENT_PRODUCTS_REQUEST,
  UPDATE_CREATE_SHIPMENT_PRODUCTS_SUCCESS,
  UPDATE_CREATE_SHIPMENT_PRODUCTS_FAILED,
  FETCH_CREATE_SHIPMENT_DATA_FAILED,
  FETCH_CREATE_SHIPMENT_DATA_SUCCESS,
  USERS_SEARCH,
  USERS_SEARCH_SUCCESS,
  USERS_SEARCH_FAILED,
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
  searchUsers: [],
  isSearching: false,
  userName: '',
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
        userName: action.meta.userName,
      };
    case FETCH_CREATE_SHIPMENT_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case USERS_SEARCH:
      return {
        ...state,
        isSearching: true,
      };
    case USERS_SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchUsers: action.payload,
      };
    case USERS_SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
      };
    default:
      return state;
  }
};
