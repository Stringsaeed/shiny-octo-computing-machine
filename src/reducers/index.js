import {combineReducers} from 'redux';
import loginReducer from './login.reducer';
import productsReducer from './products.reducer';
import dashboardReducer from './dashboard.reducer';
import shipmentsReducer from './shipments.reducer';
import createShipmentsReducer from './createShipment.reducer';

export default combineReducers({
  auth: loginReducer,
  dashboard: dashboardReducer,
  shipments: shipmentsReducer,
  products: productsReducer,
  createShipment: createShipmentsReducer,
});
