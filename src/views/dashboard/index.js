import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Container} from 'native-base';
import {bindActionCreators} from 'redux';
import {RefreshControl} from 'react-native';
import {ScrollView} from 'react-navigation';

import {fetch_dashboard} from '../../actions/dashboardActions';
import {ConnectedShipmentCard, ConnectedTopBar} from '../../containers';

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
          {!this.props.isLoading && [<ConnectedShipmentCard />]}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.dashboard.isLoading,
  dashboardError: state.dashboard.dashboardError,
  dashboardSuccess: state.dashboard.dashboardSuccess,
  productCardData: state.dashboard.productCardData,
  accountCardData: state.dashboard.accountCardData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetch_dashboard}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
