import {connect} from 'react-redux';

import {DashboardCard} from '../components';
import {shipmentCardSelector} from '../selectors';

const mapStateToProps = state => ({
  shipmentCardData: shipmentCardSelector(state.dashboard.shipmentCardData),
  dashboardSuccess: state.dashboard.dashboardSuccess,
  isLoading: state.dashboard.isLoading,
});

export const ConnectedShipmentCard = connect(
  mapStateToProps,
  null,
)(DashboardCard);
