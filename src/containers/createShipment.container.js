import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CreateShipment} from '../views';
import {fetchData, updateData} from '../actions';

const mapStateToProps = state => ({
  products: state.createShipment.products,
  isLoading: state.createShipment.isLoading,
  isSending: state.createShipment.isSending,
  disabled: state.createShipment.disabled,
  responsible: state.createShipment.responsible,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({fetch: fetchData, update: updateData}, dispatch);

export const ConnectedCreateShipment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShipment);
