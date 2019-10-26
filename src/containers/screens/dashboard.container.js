import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  accountsCardSelector,
  productsCardSelector,
  shipmentCardSelector,
} from '../../selectors';

import {Dashboard} from '../../views';
import {fetch_dashboard} from '../../actions';

Dashboard.propTypes = {
  accountCardData: PropTypes.object.isRequired,
  fetch_dashboard: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  productCardData: PropTypes.object.isRequired,
  shipmentCardData: PropTypes.object.isRequired,
};

Dashboard.navigationOptions = {
  title: 'لوحة البيانات',
  swipeEnabled: true,
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-home" size={30} color={tintColor} />
  ),
  headerForceInset: true,
  headerTintColor: '#9204cc',
};

const mapStateToProps = state => ({
  shipmentCardData: shipmentCardSelector(state.dashboard.shipmentCardData),
  productCardData: productsCardSelector(state.dashboard.productCardData),
  accountCardData: accountsCardSelector(state.dashboard.accountCardData),
  filter: state.dashboard.filter,
  isLoading: state.dashboard.isLoading,
  dashboardError: state.dashboard.dashboardError,
  dashboardSuccess: state.dashboard.dashboardSuccess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetch_dashboard}, dispatch);

export const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
