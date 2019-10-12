import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import productsReducer from './productsReducer';
import dashboardReducer from './dashboardReducer';
import shipmentsReducer from './shipmentsReducer';
import createShipmentsReducer from './createShipmentReducer';

export default combineReducers({
  auth: loginReducer,
  dashboard: dashboardReducer,
  shipments: shipmentsReducer,
  products: productsReducer,
  createShipment: createShipmentsReducer,
});
