import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CreateShipment} from '~/views';
import {fetchData, search} from '~/actions';

const mapStateToProps = state => state.createShipment;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetch: fetchData,
      searchProductsAction: search,
    },
    dispatch,
  );

export const ConnectedCreateShipment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShipment);
