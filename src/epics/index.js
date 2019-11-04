import {combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {ofType} from 'redux-observable';
import {
  map,
  tap,
  takeUntil,
  switchMap,
  catchError,
  debounceTime,
  ignoreElements,
} from 'rxjs/operators';
import axios from 'axios';

import {odooAPI} from '../services';
import {
  LOGGING_SUCCESS,
  LOGIN_REQUEST,
  EMAIL_ERROR,
  LOGIN_ERROR,
  PASSWORD_ERROR,
  loginUrl,
  _SEARCH_FAILED,
  _SEARCH_SUCCESS,
  _SEARCH_REQUEST,
} from '../constants';

const login$ = action$ =>
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
  );

const search$ = (action$, store$) =>
  action$.pipe(
    tap(obs => console.log(obs)),
    ofType(_SEARCH_REQUEST),
    tap(obs => console.log(obs)),
    debounceTime(200),
    switchMap(async action =>
      from(
        await odooAPI(store$.state.auth).search(
          action.meta.term,
          action.meta.fields,
          action.meta.modelName,
        ),
      ).pipe(
        map(results =>
          of({
            type: _SEARCH_SUCCESS,
            payload: results,
          }),
        ),
      ),
    ),
    takeUntil(action$.ofType(_SEARCH_REQUEST)),
    catchError(e =>
      of({
        type: _SEARCH_FAILED,
      }),
    ),
    ignoreElements(),
  );

export default combineEpics(search$, login$);
