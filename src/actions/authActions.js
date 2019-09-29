import {LOGIN_REQUEST} from '../constants';

export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {email, password},
});
