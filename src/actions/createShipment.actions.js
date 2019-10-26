import {odooAPI} from '../services';
import {CREATE_SHIPMENT_SUCCESS, CREATE_SHIPMENT_FAILED} from '../constants';

export const fetchData = () => async (dispatch, getState) => {
  const {settings} = getState().auth;
  const api = odooAPI(settings);
  try {
    const userId = settings.uid || api.auth();

    const group = await api.getGroups();
    const user = await api.getUser(userId);
    // console.log(user);
    if (await user[0].groups_id.includes(await group[0].id)) {
      const users = await api.getUsers(0, 10);
      const products = await api.getProducts(0, 10);
      dispatch({
        type: CREATE_SHIPMENT_SUCCESS,
        payload: products,
        meta: {
          currentUser: user[0],
          users: users,
          isAdmin: true,
        },
      });
    } else {
      const products = await api.getProducts(0, 0);
      // console.log(products, user[0], FETCH_CREATE_SHIPMENT_DATA_SUCCESS);
      dispatch({
        type: CREATE_SHIPMENT_SUCCESS,
        payload: products,
        meta: {
          currentUser: user[0],
          isAdmin: false,
        },
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: CREATE_SHIPMENT_FAILED,
    });
  }
};

// const _cr_
