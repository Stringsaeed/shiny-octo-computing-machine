import {
  PROUDCTS_SEARCH,
  PROUDCTS_SEARCH_SUCCESS,
  PROUDCTS_SEARCH_FAILED,
  CREATE_SHIPMENT_SUCCESS,
  CREATE_SHIPMENT_FAILED,
  USERS_SEARCH,
  USERS_SEARCH_SUCCESS,
  USERS_SEARCH_FAILED,
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
    case PROUDCTS_SEARCH:
      return {
        ...state,
        isSearchingProducts: true,
      };
    case PROUDCTS_SEARCH_SUCCESS:
      return {
        ...state,
        isSearchingProducts: false,
        searchUsers: action.payload,
      };
    case PROUDCTS_SEARCH_FAILED:
      return {
        ...state,
        isSearchingProducts: false,
      };
    case USERS_SEARCH:
      return {
        ...state,
        isSearchingUsers: true,
      };
    case USERS_SEARCH_SUCCESS:
      return {
        ...state,
        isSearchingUsers: false,
        searchUsers: action.payload,
      };
    case USERS_SEARCH_FAILED:
      return {
        ...state,
        isSearchingUsers: false,
      };
    default:
      return state;
  }
};
