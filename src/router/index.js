import React, { Component } from "react"; // Core Component Map View
import { View, StatusBar } from "react-native"; // View Component from React Native
import {
  Router,
  Scene,
  Tabs,
  Actions,
  ActionConst
} from "react-native-router-flux"; // For Navigation Between Screens
import Icon from "react-native-vector-icons/Ionicons"; // Icon Component from Native Base
import Login from "../screens/login";
import Dashboard from "../screens/logged/home";
import Loading from "../screens/logged/indecator";
import { Provider } from "react-native-paper";

// Component For Generating Icons for NavBar
class TabIcon extends Component {
  render() {
    const focused = this.props.focused;

    return (
      <View>
        <Icon name={this.props.iconName || "circle"} size={35} color="white" />
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <StatusBar />
        <StatusBar />
        <Router>
          <Scene key="root" initial hideNavBar>
            <Scene key="login" component={Login} />
            <Tabs
              key="loggedApp"
              tabBarPosition="top"
              tabBarStyle={{ backgroundColor: "#AE46C0" }}
              showIcon={true}
              indicatorStyle={{ backgroundColor: "transparent" }}
              tabs
              activeTintColor={"#fffcf2"}
              inactiveTintColor={"#fff1ba"}
              showLabel={false}
              lazy
              initial
            >
              <Scene
                key="dashboard"
                icon={TabIcon}
                initial
                component={Dashboard}
                iconName="ios-home"
                hideNavBar
              />
            </Tabs>
          </Scene>
        </Router>
      </View>
    );
  }
}
