import {
  FETCHING_SHIPMENTS_ERROR,
  FETCHING_SHIPMENTS_SUCCESS,
  UPDATING_SHIPMENT_ERROR,
  UPDATING_SHIPMENT_SUCCESS,
  UPDATING_SHIPMENT_REQUEST,
  REFRESHING_SHIPMENT_REQUEST,
} from '../constants';

const initialState = {
  isLoading: true,
  isRefreshing: false,
  isUpdating: false,
  data: [],
  offset: 0,
  limit: 10,
  filter: 'WEEK',
  length: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SHIPMENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
      };
    case FETCHING_SHIPMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        data: action.payload,
        length: action.meta.length,
        filter: action.meta.filter,
      };
    case UPDATING_SHIPMENT_ERROR:
      return {
        ...state,
        isUpdating: false,
      };
    case UPDATING_SHIPMENT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        data: action.payload,
        offset: action.meta.offset,
        filter: action.meta.filter,
      };
    case UPDATING_SHIPMENT_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case REFRESHING_SHIPMENT_REQUEST:
      return {
        ...state,
        isRefreshing: true,
      };
    default:
      return state;
  }
}

// function _fetchData(handle) {
//   const odoo = new Odoo(this.state.settings);

//   const inParams = new Filters(this.filter).getInParam();
//   inParams.push([
//     'product_id',
//     'picking_id',
//     'quantity',
//     'standard_price',
//     'create_date',
//     'state',
//     'barcode',
//   ]);
//   odoo
//     .search_read('portal.shipments', inParams, {
//       offset: this.state.offset,
//       limit: this.state.limit,
//     })
//     .then(value => {
//       this.setState({data: value, [handle]: false});
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// function _getLimit() {
// }

// function _updateList(_state) {
//   let handle = 'fetching_data';
//   if (_state === 'in') {
//     this.setState({offset: this.state.offset + this.state.limit});
//   } else if (_state === 'de') {
//     this.setState({offset: this.state.offset - this.state.limit});
//   }
//   this.setState({[handle]: true}, () => {
//     this._fetchData(handle);
//   });
// }
