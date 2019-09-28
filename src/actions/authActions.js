import {LOGIN_REQUEST} from '../constants';

const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {email, password},
});

export default loginRequest;
