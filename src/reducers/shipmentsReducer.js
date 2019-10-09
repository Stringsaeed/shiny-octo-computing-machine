import {
  FETCHING_SHIPMENTS_ERROR,
  FETCHING_SHIPMENTS_SUCCESS,
  FETCHING_SHIPMENTS_REQUEST,
  UPDATING_SHIPMENT_ERROR,
  UPDATING_SHIPMENT_SUCCESS,
  UPDATING_SHIPMENT_REQUEST,
} from '../constants';

const initialState = {
  isLoading: true,
  isRefreshing: false,
  isUpdating: false,
  data: [],
  offset: 0,
  limit: 10,
  filter: 'WEEK',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SHIPMENTS_ERROR:
      return {};
    case FETCHING_SHIPMENTS_SUCCESS:
      return {};
    case FETCHING_SHIPMENTS_REQUEST:
      return {};
    case UPDATING_SHIPMENT_ERROR:
      return {};
    case UPDATING_SHIPMENT_SUCCESS:
      return {};
    case UPDATING_SHIPMENT_REQUEST:
      return {};

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
//   const odoo = new Odoo(this.state.settings);
//   const inParams = new Filters(this.filter).getInParam();
//   odoo
//     .search_count('portal.shipments', inParams)
//     .then(value => {
//       this.setState({lenShipment: value});
//     })
//     .catch(err => {
//       console.log(err);
//     });
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
