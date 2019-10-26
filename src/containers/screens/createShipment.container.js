import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CreateShipment} from '../../views';
import {fetchData, searchUsers, searchProducts} from '../../actions';

const mapStateToProps = state => state.createShipment;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetch: fetchData,
      searchProductsAction: searchProducts,
      searchUsersAction: searchUsers,
    },
    dispatch,
  );

export const ConnectedCreateShipment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShipment);
