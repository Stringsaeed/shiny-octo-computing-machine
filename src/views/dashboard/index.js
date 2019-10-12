import React, {Component, Fragment} from 'react';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import {BallIndicator} from 'react-native-indicators';
import {ScrollView as SV, StyleSheet, View} from 'react-native';

import {dashboardFiltersPortal} from '../../constants';
import {DashboardCard, TopBar} from '../../components';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props.fetch_dashboard(this.props.filter);
  }

  _onRefresh = () => {
    this.props.fetch_dashboard(this.props.filter);
  };

  render() {
    const {
      fetch_dashboard,
      filter,
      isLoading,
      shipmentCardData,
      productCardData,
      accountCardData,
    } = this.props;
    return (
      <Fragment>
        <TopBar
          filter={filter}
          filters={dashboardFiltersPortal}
          onFiltering={_filter => {
            fetch_dashboard(_filter);
          }}
          name="لوحة البيانات"
        />
        <SV style={styles.scrollView}>
          {isLoading ? (
            <View style={styles.indicatorView}>
              <BallIndicator color="#de356a" />
            </View>
          ) : (
            <View style={styles.view}>
              <DashboardCard
                noChartMessage="لا توجد شحنات"
                chartData={shipmentCardData.data}
                items={[
                  {
                    left: shipmentCardData.total,
                    content: false,
                    right: 'المرسلة',
                  },
                  {
                    left: shipmentCardData.in_transit,
                    content: true,
                    color: shipmentCardData.data[0].fill,
                    right: 'في الطريق',
                  },
                  {
                    left: shipmentCardData.approved,
                    content: true,
                    color: shipmentCardData.data[1].fill,
                    right: 'المستلمة',
                  },
                  {
                    left: shipmentCardData.rejected,
                    content: true,
                    color: shipmentCardData.data[2].fill,
                    right: 'المرفوضة',
                  },
                ]}
                headerName="الشحنات"
              />

              <DashboardCard
                noChartMessage="لا توجد منتجات"
                chartData={productCardData.data}
                items={[
                  {
                    left: productCardData.sold,
                    content: false,
                    right: 'المباعة',
                  },
                  {
                    left: productCardData.available,
                    content: true,
                    color: productCardData.data[0].fill,
                    right: 'بالمحل',
                  },
                  {
                    left: productCardData.received,
                    content: true,
                    color: productCardData.data[1].fill,
                    right: 'المستلمة',
                  },
                  {
                    left: productCardData.scrap,
                    content: true,
                    color: productCardData.data[2].fill,
                    right: 'المنتهية',
                  },
                ]}
                headerName="المنتجات"
              />

              <DashboardCard
                noChartMessage="لا توجد حسابات"
                chartData={accountCardData.data}
                items={[
                  {
                    left: accountCardData.shipments,
                    content: false,
                    right: 'اجمالي الشحنات',
                  },
                  {
                    left: accountCardData.payments,
                    content: true,
                    color: accountCardData.data[0].fill,
                    right: 'اجمالي المبيعات',
                  },
                  {
                    left: accountCardData.received,
                    content: true,
                    color: accountCardData.data[1].fill,
                    right: 'المستلمة',
                  },
                  {
                    left: accountCardData.remaining,
                    content: true,
                    color: accountCardData.data[2].fill,
                    right: 'المتبقية',
                  },
                  {
                    left: accountCardData.scrap,
                    content: true,
                    color: accountCardData.data[3].fill,
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
