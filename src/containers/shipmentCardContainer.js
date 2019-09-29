import {connect} from 'react-redux';
import {ShipmentCard} from '../components';

const mapStateToProps = state => ({
  shipmentCardData: state.dashboard.shipmentCardData,
});

export default connect(
  mapStateToProps,
  {},
)(ShipmentCard);
