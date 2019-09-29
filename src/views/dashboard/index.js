import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Container} from 'native-base';
import {bindActionCreators} from 'redux';
import {RefreshControl} from 'react-native';
import {ScrollView} from 'react-navigation';

import {ConnectedTopBar} from '../../containers';
import {fetch_dashboard} from '../../actions/dashboardActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  _onRefresh = () => {
    this.props.fetch_dashboard();
  };
  render() {
    return (
      <Container>
        <ConnectedTopBar />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this._onRefresh.bind(this)}
              title={'اسحب لاعادة التحميل'}
              tintColor={'#de356a'}
            />
          }>
          {!this.props.isLoading && [
            <ShipmentCard />,
            <ProductCard />,
            <AccountCard />,
          ]}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.dashboard.isLoading,
  dashboardError: state.dashboard.dashboardError,
  dashboardSuccess: state.dashboard.dashboardSuccess,
  shipmentCardData: state.dashboard.shipmentCardData,
  productCardData: state.dashboard.productCardData,
  accountCardData: state.dashboard.accountCardData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetch_dashboard}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
