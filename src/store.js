import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';

import rootEpic from './epics';
import rootReducer from './reducers';

const initialState = {};

const epicMiddelware = createEpicMiddleware();
// redux-thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, epicMiddelware)),
);
epicMiddelware.run(rootEpic);
export default store;
