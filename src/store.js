import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';

import rootEpic from './epics';
import rootReducer from './reducers';

const initialState = {};

const epicMiddelware = createEpicMiddleware();
// redux-thunk
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, epicMiddelware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
epicMiddelware.run(rootEpic);
export default store;
