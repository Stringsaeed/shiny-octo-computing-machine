import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import dashboardReducer from './dashboardReducer';
import shipmentsReducer from './shipmentsReducer';

export default combineReducers({
  auth: loginReducer,
  dashboard: dashboardReducer,
  shipments: shipmentsReducer,
});
