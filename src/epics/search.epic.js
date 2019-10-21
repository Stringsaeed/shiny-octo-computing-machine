import {from, of} from 'rxjs';
import {ofType} from 'redux-observable';
import {
  map,
  switchMap,
  debounceTime,
  takeUntil,
  catchError,
} from 'rxjs/operators';

import {odooAPI} from '../services';
import {
  USERS_SEARCH,
  USERS_SEARCH_SUCCESS,
  USERS_SEARCH_FAILED,
  PROUDCTS_SEARCH,
  PROUDCTS_SEARCH_SUCCESS,
  PROUDCTS_SEARCH_FAILED,
} from '../constants';

export const searchUsers = (action$, store$) =>
  action$.pipe(
    ofType(USERS_SEARCH),
    debounceTime(200),
    switchMap(action => {
      const {term} = action.meta;
      const {settings} = store$.state.auth;
      const api = odooAPI(settings);
      return from(api.search(term, ['name', 'id'], 'res.users')).pipe(
        map(results => ({
          type: USERS_SEARCH_SUCCESS,
          payload: results,
        })),
      );
    }),
    takeUntil(action$.ofType(USERS_SEARCH)),
    catchError(e => ({
      type: USERS_SEARCH_FAILED,
    })),
  );

export const searchProducts = (action$, state$) =>
  action$.pipe(
    ofType(PROUDCTS_SEARCH),
    debounceTime(200),
    switchMap(action => {
      const {term} = action.meta;
      const {settings} = state$.value.auth;
      const api = odooAPI(settings);
      return from(
        api.search(
          term,
          ['name', 'standard_price', 'responsible_id'],
          'product.template',
        ),
      ).pipe(
        map(results => ({
          type: PROUDCTS_SEARCH_SUCCESS,
          payload: results,
        })),
        takeUntil(action$.pipe(ofType(PROUDCTS_SEARCH))),
        catchError(e => {
          console.log(e);
          return of({
            type: PROUDCTS_SEARCH_FAILED,
          });
        }),
      );
    }),
  );
