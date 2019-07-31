import React, {Component} from "react";
import {RefreshControl, BackHandler} from "react-native";
import {ScrollView, withNavigation} from "react-navigation";
import {Container} from "native-base";
import ShipmentCard from "./components/shipments_card";
import ProductCard from "./components/products_card";
import AccountCard from "./components/accounts_card";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false})
    }, 1000)
  }


  componentWillMount() {
    console.log(this.props);
    BackHandler.addEventListener('hardwareBackPress', Dashboard.handleBackButton);
  }
  //
  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  // }

  static handleBackButton(){
    return true;
  }
  render() {
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              title={"اسحب لاعادة التحميل"}
              tintColor={"#de356a"}
            />
          }
        >{!this.state.refreshing && [
          <ShipmentCard refreshing={this.state.refreshing}/>,
          <ProductCard refreshing={this.state.refreshing}/>,
          <AccountCard refreshing={this.state.refreshing}/>
        ]}
        </ScrollView>
      </Container>
    );
  }
}

export default withNavigation(Dashboard);
