import {
  FETCHING_PRODUCTS_ERROR,
  FETCHING_PRODUCTS_SUCCESS,
  UPDATING_PRODUCTS_ERROR,
  UPDATING_PRODUCTS_REQUEST,
  UPDATING_PRODUCTS_SUCCESS,
  REFRESHING_PRODUCTS_REQUEST,
} from '../constants';

const initialState = {
  isLoading: true,
  isRefreshing: false,
  isUpdating: false,
  data: [],
  offset: 0,
  limit: 10,
  length: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
      };
    case FETCHING_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        data: action.payload,
        length: action.meta.length,
      };
    case UPDATING_PRODUCTS_ERROR:
      return {
        ...state,
        isUpdating: false,
      };
    case UPDATING_PRODUCTS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        data: action.payload,
        offset: action.meta.offset,
      };
    case UPDATING_PRODUCTS_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case REFRESHING_PRODUCTS_REQUEST:
      return {
        ...state,
        isRefreshing: true,
      };
    default:
      return state;
  }
}
