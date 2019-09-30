import {connect} from 'react-redux';
import {ShipmentCard} from '../components';

const mapStateToProps = state => ({
  shipmentCardData: state.dashboard.shipmentCardData,
  dashboardSuccess: state.dashboard.dashboardSuccess,
});

export const ConnectedShipmentCard = connect(
  mapStateToProps,
  null,
)(ShipmentCard);
