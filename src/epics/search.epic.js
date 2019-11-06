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

import {odooAPI} from '../services';
import {_SEARCH_FAILED, _SEARCH_SUCCESS, _SEARCH_REQUEST} from '../constants';

export default (action$, store$) =>
	action$.pipe(
		tap(obs => console.log(obs)),
		ofType(_SEARCH_REQUEST),
		tap(obs => console.log(obs)),
		debounceTime(200),
		switchMap(action =>
			from(
				odooAPI(store$.state.auth).search(
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
