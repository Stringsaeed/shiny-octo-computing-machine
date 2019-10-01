import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BallIndicator} from 'react-native-indicators';
import {SafeAreaView, ScrollView as SV, StyleSheet, View} from 'react-native';

import {ConnectedTopBar} from '../../containers';
import {shipmentCardSelector} from '../../selectors';
import {ShipmentCard} from '../../components/shipmentCard';
import {fetch_dashboard} from '../../actions/dashboardActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props.fetch_dashboard(this.props.filter);
  }

  _onRefresh = () => {
    this.props.fetch_dashboard(this.props.filter);
  };

  render() {
    console.log(this.props.isLoading);
    return (
      <Fragment>
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{horizontal: 'always', top: 'always'}}>
          <ConnectedTopBar />
          <SV>
            {this.props.isLoading ? (
              <View style={styles.indicatorView}>
                <BallIndicator color="#de356a" />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <ShipmentCard shipmentCardData={this.props.shipmentCardData} />
              </View>
            )}
          </SV>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shipmentCardData: shipmentCardSelector(state.dashboard.shipmentCardData),
  isLoading: state.dashboard.isLoading,
  dashboardError: state.dashboard.dashboardError,
  dashboardSuccess: state.dashboard.dashboardSuccess,
  productCardData: state.dashboard.productCardData,
  accountCardData: state.dashboard.accountCardData,
  filter: state.dashboard.filter,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetch_dashboard}, dispatch);

export default connect(
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
