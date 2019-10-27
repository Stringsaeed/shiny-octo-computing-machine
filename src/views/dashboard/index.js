import React, {Component, Fragment} from 'react';
import {Card, CardItem, Icon} from 'native-base';
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
      screenProps,
      fetch_dashboard,
      filter,
      isLoading,
      shipmentCardData,
      productCardData,
      accountCardData,
    } = this.props;
    const {t} = screenProps;
    return (
      <Fragment>
        <TopBar
          filter={filter}
          filters={dashboardFiltersPortal}
          onFiltering={_filter => {
            fetch_dashboard(_filter);
          }}
          name={t('dashboard.topBarTitle')}
        />
        {isLoading ? (
          <Card transparent style={styles.indicatorCardView}>
            <CardItem style={styles.flex}>
              <View style={styles.flex}>
                <View style={styles.indicatorView}>
                  <BallIndicator color="#540e33" />
                </View>
              </View>
            </CardItem>
          </Card>
        ) : (
          <SV style={styles.scrollView}>
            <View style={styles.view}>
              <DashboardCard
                noChartMessage={t('dashboard.shipmentsCard.noChartMessage')}
                chartData={shipmentCardData.data}
                items={[
                  {
                    right: shipmentCardData.total,
                    content: false,
                    left: t('dashboard.shipmentsCard.total'),
                  },
                  {
                    right: shipmentCardData.in_transit,
                    content: true,
                    color: shipmentCardData.data[0].fill,
                    left: t('dashboard.shipmentsCard.inTransit'),
                  },
                  {
                    right: shipmentCardData.approved,
                    content: true,
                    color: shipmentCardData.data[1].fill,
                    left: t('dashboard.shipmentsCard.received'),
                  },
                  {
                    right: shipmentCardData.rejected,
                    content: true,
                    color: shipmentCardData.data[2].fill,
                    left: t('dashboard.shipmentsCard.rejected'),
                  },
                ]}
                headerName={t('dashboard.shipmentsCard.cardTitle')}
              />

              <DashboardCard
                noChartMessage={t('dashboard.productsCard.noChartMessage')}
                chartData={productCardData.data}
                items={[
                  {
                    right: productCardData.sold,
                    content: false,
                    left: t('dashboard.productsCard.sold'),
                  },
                  {
                    right: productCardData.available,
                    content: true,
                    color: productCardData.data[0].fill,
                    left: t('dashboard.productsCard.available'),
                  },
                  {
                    right: productCardData.received,
                    content: true,
                    color: productCardData.data[1].fill,
                    left: t('dashboard.productsCard.received'),
                  },
                  {
                    right: productCardData.scrap,
                    content: true,
                    color: productCardData.data[2].fill,
                    left: t('dashboard.productsCard.scrap'),
                  },
                ]}
                headerName={t('dashboard.productsCard.cardTitle')}
              />

              <DashboardCard
                noChartMessage={t('dashboard.accountsCard.noChartMessage')}
                chartData={accountCardData.data}
                items={[
                  {
                    right: accountCardData.shipments,
                    content: false,
                    left: t('dashboard.accountsCard.shipments'),
                  },
                  {
                    right: accountCardData.payments,
                    content: true,
                    color: accountCardData.data[0].fill,
                    left: t('dashboard.accountsCard.payments'),
                  },
                  {
                    right: accountCardData.received,
                    content: true,
                    color: accountCardData.data[1].fill,
                    left: t('dashboard.accountsCard.received'),
                  },
                  {
                    right: accountCardData.remaining,
                    content: true,
                    color: accountCardData.data[2].fill,
                    left: t('dashboard.accountsCard.remaining'),
                  },
                  {
                    right: accountCardData.scrap,
                    content: true,
                    color: accountCardData.data[3].fill,
                    left: t('dashboard.accountsCard.scrap'),
                  },
                ]}
                headerName={t('dashboard.accountsCard.cardTitle')}
              />
            </View>
          </SV>
        )}
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
  indicatorCardView: {
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20,
    marginRight: 15,
  },
  indicatorView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
