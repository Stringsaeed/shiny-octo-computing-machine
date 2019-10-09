import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {bindActionCreators} from 'redux';
import {BallIndicator} from 'react-native-indicators';
import {ScrollView as SV, StyleSheet, View} from 'react-native';

import {ConnectedTopBar} from '../../containers';
import {DashboardCard} from '../../components/card';
import {fetch_dashboard} from '../../actions/dashboardActions';
import {
  accountsCardSelector,
  productsCardSelector,
  shipmentCardSelector,
} from '../../selectors';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props.fetch_dashboard(this.props.filter);
  }

  _onRefresh = () => {
    this.props.fetch_dashboard(this.props.filter);
  };

  render() {
    return (
      <Fragment>
        <ConnectedTopBar />
        <SV style={{flex: 1}}>
          {this.props.isLoading ? (
            <View style={styles.indicatorView}>
              <BallIndicator color="#de356a" />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <DashboardCard
                noChartMessage="لا توجد شحنات"
                chartData={this.props.shipmentCardData.data}
                items={[
                  {
                    left: this.props.shipmentCardData.total,
                    content: false,
                    right: 'المرسلة',
                  },
                  {
                    left: this.props.shipmentCardData.in_transit,
                    content: true,
                    color: this.props.shipmentCardData.data[0].fill,
                    right: 'في الطريق',
                  },
                  {
                    left: this.props.shipmentCardData.approved,
                    content: true,
                    color: this.props.shipmentCardData.data[1].fill,
                    right: 'المستلمة',
                  },
                  {
                    left: this.props.shipmentCardData.rejected,
                    content: true,
                    color: this.props.shipmentCardData.data[2].fill,
                    right: 'المرفوضة',
                  },
                ]}
                headerName="الشحنات"
              />

              <DashboardCard
                noChartMessage="لا توجد منتجات"
                chartData={this.props.productCardData.data}
                items={[
                  {
                    left: this.props.productCardData.sold,
                    content: false,
                    right: 'المباعة',
                  },
                  {
                    left: this.props.productCardData.available,
                    content: true,
                    color: this.props.productCardData.data[0].fill,
                    right: 'بالمحل',
                  },
                  {
                    left: this.props.productCardData.received,
                    content: true,
                    color: this.props.productCardData.data[1].fill,
                    right: 'المستلمة',
                  },
                  {
                    left: this.props.productCardData.scrap,
                    content: true,
                    color: this.props.productCardData.data[2].fill,
                    right: 'المنتهية',
                  },
                ]}
                headerName="المنتجات"
              />

              <DashboardCard
                noChartMessage="لا توجد حسابات"
                chartData={this.props.accountCardData.data}
                items={[
                  {
                    left: this.props.accountCardData.shipments,
                    content: false,
                    right: 'اجمالي الشحنات',
                  },
                  {
                    left: this.props.accountCardData.payments,
                    content: true,
                    color: this.props.accountCardData.data[0].fill,
                    right: 'اجمالي المبيعات',
                  },
                  {
                    left: this.props.accountCardData.received,
                    content: true,
                    color: this.props.accountCardData.data[1].fill,
                    right: 'المستلمة',
                  },
                  {
                    left: this.props.accountCardData.remaining,
                    content: true,
                    color: this.props.accountCardData.data[2].fill,
                    right: 'المتبقية',
                  },
                  {
                    left: this.props.accountCardData.scrap,
                    content: true,
                    color: this.props.accountCardData.data[3].fill,
                    right: 'قيمة التالف',
                  },
                ]}
                headerName="الحسابات"
              />
            </View>
          )}
        </SV>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  accountCardData: PropTypes.object.isRequired,
  fetch_dashboard: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  productCardData: PropTypes.object.isRequired,
  shipmentCardData: PropTypes.object.isRequired
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

const styles = StyleSheet.create({
  indicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
