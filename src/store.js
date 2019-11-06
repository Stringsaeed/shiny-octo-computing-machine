import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootEpic from './epics';
import rootReducer from './reducers';

const initialState = {};
const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(epicMiddleware, thunk, logger)),
);
epicMiddleware.run(rootEpic);
export default store;
