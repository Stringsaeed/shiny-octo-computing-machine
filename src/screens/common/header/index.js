import React, {Component} from "react";
import {StatusBar} from "react-native";
import {Text, View} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createMaterialTopTabNavigator,
  NavigationActions,
  NavigationScreenProp,
  SafeAreaView,
  createStackNavigator
} from "react-navigation";
import Dashboard from "../../logged/home";
import ProductScreen from "../../logged/product";
import ShipmentScreen from "../../logged/shipment";
import ProductCreateScreen from "../../logged/create_product";
import ShipmentCreateScreen from "../../logged/create_shipment";
import ProfileScreen from "../../logged/profile";

const ShipmentStack = createStackNavigator(
  {
    ShipmentView: {screen: ShipmentScreen},
    ShipmentCreate: {screen: ShipmentCreateScreen}
  },
  {
    initialRouteName: "ShipmentView",
    headerMode: "none",
    navigationOptions: {headerVisible: false}
  }
);

const ProductStack = createStackNavigator(
  {
    ProductView: {
      screen: ProductScreen
      // navigationOptions: {
      //   headerMode: "none",
      //   headerVisible: false
      // }
    },
    ProductCreate: {
      screen: ProductCreateScreen
      // navigationOptions: {
      //   headerMode: "none",
      //   headerVisible: false
      // }
    }
  },
  {
    initialRouteName: "ProductView",
    headerMode: "none",
    navigationOptions: {headerVisible: false}
  }
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerMode: null,
        tabBarOnPress: ({navigation, defaultHandler}) => {
          defaultHandler();
        }
      }
    },
    Products: {
      screen: ProductStack,
      navigationOptions: {
        headerMode: null,
        headerVisible: false
      }
    },
    Shipments: {
      screen: ShipmentStack,
      navigationOptions: {
        headerMode: null
      }
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        headerMode: null
      }
    }
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor, focused}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Dashboard") {
          iconName = "ios-home";
        } else if (routeName === "Profile") {
          iconName = "ios-person";
        } else if (routeName === "Products") {
          iconName = "md-cube";
        } else if (routeName === "Shipments") {
          if (focused) {
            iconName = "ios-send";
          } else {
            iconName = "md-send";
          }
        }
        return <IconComponent name={iconName} size={30} color={tintColor}/>;
      },
      header: null
    }),
    tabBarOptions: {
      activeTintColor: "#6e9086",
      inactiveTintColor: "#fdc8b7",
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: "#de356a"
      }
    },
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: "Dashboard",
    lazy: true
  }
);

class TopTabStatus extends Component {
  static router = TabNavigator.router;

  render() {
    const {navigation} = this.props;
    const {routes, index, params} = navigation.state;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="default"/>
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{horizontal: "always", top: "always"}}
        >
          <TabNavigator navigation={navigation}/>
        </SafeAreaView>
      </View>
    );
  }
}

export default TopTabStatus;
