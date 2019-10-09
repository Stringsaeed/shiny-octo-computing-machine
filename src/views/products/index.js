import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'native-base';

const MyComponent = () => {
  return (
    <View>
      <Text>HH</Text>
    </View>
  );
};

MyComponent.navigationOptions = {
  title: 'لوحة البيانات',
  swipeEnabled: true,
  tabBarIcon: ({tintColor}) => (
    <Icon name="md-cube" size={30} color={tintColor} />
  ),
  headerForceInset: true,
  headerTintColor: '#9204cc',
};
export default MyComponent;
