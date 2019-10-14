import {from} from 'rxjs';
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
} from '../constants';

export const searchItem = (action$, store$) =>
  action$.pipe(
    ofType(USERS_SEARCH),
    debounceTime(200),
    switchMap(action => {
      const {term, fields, modelName} = action.meta;
      const {settings} = store$.state.auth;
      const api = odooAPI(settings);
      from(api.search(term, fields, modelName)).pipe(
        map(results => ({
          type: USERS_SEARCH_SUCCESS,
          payload: results,
        })),
        takeUntil(action$.ofType(USERS_SEARCH)),
      );
    }),
    catchError(e => ({
      type: USERS_SEARCH_FAILED,
    })),
  );
