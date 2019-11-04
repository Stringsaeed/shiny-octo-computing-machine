import {
  PROUDCTS_SEARCH,
  PROUDCTS_SEARCH_SUCCESS,
  PROUDCTS_SEARCH_FAILED,
  CREATE_SHIPMENT_SUCCESS,
  CREATE_SHIPMENT_FAILED,
  _SEARCH_REQUEST,
  _SEARCH_SUCCESS,
  _SEARCH_FAILED,
} from '../constants';

const initialState = {
  products: [],
  isLoading: true,
  isSending: false,
  isAdmin: false,
  searchProducts: [],
  isSearchingProducts: false,
  searchUsers: [],
  isSearchingUsers: false,
  currentUser: {},
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHIPMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        isAdmin: action.meta.isAdmin,
        users: action.meta.users || state.users,
        currentUser: action.meta.currentUser,
      };
    case CREATE_SHIPMENT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case _SEARCH_REQUEST:
      return {
        ...state,
        isSearchingUsers: true,
      };
    case _SEARCH_SUCCESS:
      return {
        ...state,
        isSearchingUsers: false,
        searchProducts: action.payload,
      };
    case _SEARCH_FAILED:
      return {
        ...state,
        isSearchingUsers: false,
      };
    default:
      return state;
  }
};
