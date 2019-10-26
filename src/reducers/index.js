import {combineReducers} from 'redux';
import loginReducer from './login.reducer';
import searchReducer from './search.reducer';
import productsReducer from './products.reducer';
import dashboardReducer from './dashboard.reducer';
import shipmentsReducer from './shipments.reducer';
import createShipmentsReducer from './createShipment.reducer';

export default combineReducers({
  auth: loginReducer,
  search: searchReducer,
  products: productsReducer,
  shipments: shipmentsReducer,
  dashboard: dashboardReducer,
  createShipment: createShipmentsReducer,
});
