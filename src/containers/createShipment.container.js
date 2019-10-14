import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CreateShipment} from '../views';
import {fetchData, updateData, search} from '../actions';

const mapStateToProps = state => ({
  products: state.createShipment.products,
  isLoading: state.createShipment.isLoading,
  isSending: state.createShipment.isSending,
  disabled: state.createShipment.disabled,
  responsible: state.createShipment.responsible,
  isSearching: state.createShipment.isSearching,
  searchUsers: state.createShipment.searchUsers,
  userName: state.createShipment.userName,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {fetch: fetchData, update: updateData, search: search},
    dispatch,
  );

export const ConnectedCreateShipment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShipment);
