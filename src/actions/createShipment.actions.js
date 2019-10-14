import {odooAPI} from '../services';
import {
  UPDATE_CREATE_SHIPMENT_PRODUCTS_REQUEST,
  UPDATE_CREATE_SHIPMENT_PRODUCTS_SUCCESS,
  UPDATE_CREATE_SHIPMENT_PRODUCTS_FAILED,
  FETCH_CREATE_SHIPMENT_DATA_FAILED,
  FETCH_CREATE_SHIPMENT_DATA_SUCCESS,
  USERS_SEARCH,
} from '../constants';

export const search = (term, fields, modelName) => ({
  type: USERS_SEARCH,
  meta: {
    term: term,
    fields: fields,
    modelName: modelName,
  },
});

export const fetchData = () => async (dispatch, getState) => {
  const {settings} = getState().auth;
  const api = odooAPI(settings);
  try {
    const userId = settings.uid || api.auth();
    const {offset, limit} = getState().createShipment;

    const products = await api.getProducts(offset, limit);

    const group = await api.getGroups();
    const user = await api.getUser(userId);

    if (await user[0].groups_id.includes(await group[0].id)) {
      const users = await api.getUsers(offset, limit);
      dispatch({
        type: FETCH_CREATE_SHIPMENT_DATA_SUCCESS,
        payload: products,
        meta: {
          responsible: users,
          isAdmin: true,
          userName: user[0].display_name,
        },
      });
    } else {
      dispatch({
        type: FETCH_CREATE_SHIPMENT_DATA_SUCCESS,
        payload: products,
        meta: {
          responsible: user[0],
          isAdmin: false,
          userName: user[0].display_name,
        },
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: FETCH_CREATE_SHIPMENT_DATA_FAILED,
    });
  }
};

export const updateData = _key => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_CREATE_SHIPMENT_PRODUCTS_REQUEST,
  });
  const {settings} = getState().auth;
  const api = odooAPI(settings);
  const {offset, limit} = getState().createShipment;
  const newOffset = _key === 'in' ? offset + limit : offset - limit;
  try {
    const products = await api.getProducts(newOffset, limit);
    dispatch({
      type: UPDATE_CREATE_SHIPMENT_PRODUCTS_SUCCESS,
      payload: products,
      meta: {
        offset: newOffset,
      },
    });
  } catch (e) {
    dispatch({
      type: UPDATE_CREATE_SHIPMENT_PRODUCTS_FAILED,
    });
  }
};

// const _cr_
