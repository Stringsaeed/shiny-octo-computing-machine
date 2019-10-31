import {of} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import axios from 'axios';
import {
  LOGGING_SUCCESS,
  LOGIN_REQUEST,
  EMAIL_ERROR,
  LOGIN_ERROR,
  PASSWORD_ERROR,
  loginUrl,
} from '../constants';

const loginUser = action$ =>
  action$.pipe(
    ofType(LOGIN_REQUEST),
    switchMap(async action => {
      const request = await axios.post(loginUrl, {
        username: action.payload.email,
        password: action.payload.password,
        mobile_device: 'XXXX',
        mobile_platform: 'XXXX',
      });
      console.log(request.data);
      if (request.data.respond === 'success') {
        const settings = {
          url: `${request.data.protocol}://${request.data.server}:${request.data.port}`,
          username: request.data.username,
          password: request.data.password,
          db: request.data.db,
        };
        return {
          type: LOGGING_SUCCESS,
          payload: settings,
        };
      }
      if (request.data.respond === 'error') {
        if (request.data.message === 'Username not found') {
          return {
            type: EMAIL_ERROR,
          };
        } else if (request.data.message === 'Invalid password') {
          return {
            type: PASSWORD_ERROR,
          };
        } else {
          return {
            type: LOGIN_ERROR,
            meta: {
              message: request.data.message,
            },
          };
        }
      }
    }),
    catchError(err =>
      of({
        type: PASSWORD_ERROR,
      }),
    ),
  );

export default loginUser;
