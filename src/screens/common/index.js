import TabBar from './header';
import {createAppContainer, createStackNavigator} from "react-navigation";
import LoginScreen from '../login';

const appStack = createStackNavigator({
    AppComponent: {
      screen: TabBar,
      navigationOptions: {
        header: null
      }
    },
    LoginComponent: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'LoginComponent',
  });

export default createAppContainer(appStack);
