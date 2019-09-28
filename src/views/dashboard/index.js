import React, {Component} from 'react';
import {withNavigation, ScrollView} from 'react-navigation';
import {RefreshControl, StyleSheet} from 'react-native';
import FilterBar from './topBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      visible: false,
      is_checked: 'WEEK',
      default_filter: 'Current Week',
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 500);
  }

  render() {
    return (
      <Container>
        <FilterBar />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              title={'اسحب لاعادة التحميل'}
              tintColor={'#de356a'}
            />
          }>
          {!this.state.refreshing && [
            <ShipmentCard
              refreshing={this.state.refreshing}
              filter={this.state.default_filter}
            />,
            <ProductCard
              refreshing={this.state.refreshing}
              filter={this.state.default_filter}
            />,
            <AccountCard
              refreshing={this.state.refreshing}
              filter={this.state.default_filter}
            />,
          ]}
        </ScrollView>
      </Container>
    );
  }
}

export default withNavigation(Dashboard);
