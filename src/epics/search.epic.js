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
import {SEARCH, SEARCH_SUCCESS, SEARCH_FAILED} from '../constants';

export const search$ = (action$, store$) => {
  console.log('a7aaaaaa');
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(200),
    switchMap(action => {
      console.log(action);
      const {term, fields, modelName} = action.meta;
      const {settings} = store$.state.auth;
      const api = odooAPI(settings);
      return from(api.search(term, fields, modelName)).pipe(
        map(results =>
          of({
            type: SEARCH_SUCCESS,
            payload: results,
          }),
        ),
      );
    }),
    takeUntil(action$.ofType(SEARCH)),
    catchError(e =>
      of({
        type: SEARCH_FAILED,
      }),
    ),
  );
};

// export const searchProducts = (action$, state$) =>
//   action$.pipe(
//     ofType(PROUDCTS_SEARCH),
//     debounceTime(200),
//     switchMap(action => {
//       const {term} = action.meta;
//       const {settings} = state$.value.auth;
//       const api = odooAPI(settings);
//       return from(
//         api.search(
//           term,
//           ['name', 'standard_price', 'responsible_id'],
//           'product.template',
//         ),
//       ).pipe(
//         map(results => ({
//           type: PROUDCTS_SEARCH_SUCCESS,
//           payload: results,
//         })),
//         takeUntil(action$.pipe(ofType(PROUDCTS_SEARCH))),
//         catchError(e => {
//           console.log(e);
//           return of({
//             type: PROUDCTS_SEARCH_FAILED,
//           });
//         }),
//       );
//     }),
//   );
