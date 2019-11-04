import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CreateShipment} from '~/views';
import {fetchData, searchRequest} from '../../actions';

const mapStateToProps = state => state.createShipment;
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchRequest,
      fetchData,
    },
    dispatch,
  );

export const ConnectedCreateShipment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShipment);
