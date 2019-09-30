import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Container, Grid} from 'native-base';
import {bindActionCreators} from 'redux';
import {ScrollView} from 'react-navigation';
import {BallIndicator} from 'react-native-indicators';
import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView as SV,
  SafeAreaView,
} from 'react-native';

import {fetch_dashboard} from '../../actions/dashboardActions';
import {ConnectedShipmentCard, ConnectedTopBar} from '../../containers';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props.fetch_dashboard(this.props.filter);
  }
  componentDidMount() {}
  componentDidUpdate(prevState) {
    if (prevState.dashboardSuccess) {
      console.log(prevState);
    }
  }
  _onRefresh = () => {
    this.props.fetch_dashboard();
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ConnectedTopBar />
        {/* <SV
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoading}
                onRefresh={this._onRefresh.bind(this)}
                title={'اسحب لاعادة التحميل'}
                tintColor="#de356a"
              />
            }> */}
        {this.props.isLoading ? (
          <View style={styles.indicatorView}>
            <BallIndicator color="#de356a" />
          </View>
        ) : (
          <ConnectedShipmentCard />
        )}
        {/* </SV> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
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
});
