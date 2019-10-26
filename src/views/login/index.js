import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {
  Content,
  Form,
  Icon,
  Input,
  Item,
  Root,
  Text,
  Toast,
  View,
} from 'native-base';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.textInput = React.createRef();
    this._fetchData = this._fetchData.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.success) {
      this.props.navigation.navigate('app');
    } else if (this.props.emailError) {
      Toast.show({
        text: 'لم تمت عملية الدخول',
      });
    }
  }

  _fetchData() {
    this.props.loginRequest(this.state.email, this.state.password);
  }

  _onPress = () => this._fetchData();

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}>
          <Root>
            <Content>
              <View style={styles.firstView}>
                <View style={styles.secondView}>
                  <Text style={styles.headText}>تسجيل الدخول</Text>
                </View>
                <View style={styles.view}>
                  <Form>
                    <Text style={styles.text}>
                      البريد الالكتروني/ رقم الجوال
                    </Text>
                    <Item style={styles.item} error={this.props.emailError}>
                      <Icon name="person" />
                      <Input
                        value={this.state.email}
                        onChangeText={email => {
                          this.setState({email: email});
                        }}
                        returnKeyType="next"
                      />
                    </Item>
                    <Text style={styles.text}>كلمة المرور</Text>
                    <Item style={styles.item} error={this.props.passwordError}>
                      <Icon name="lock" />
                      <Input
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={password => {
                          this.setState({password: password});
                        }}
                      />
                    </Item>
                  </Form>
                </View>
                <View style={styles.buttonView}>
                  <Button
                    icon="exit-to-app"
                    mode="outline"
                    style={styles.button}
                    animated
                    onPress={this._onPress}
                    loading={this.props.isLoading}>
                    تسجيل الدخول
                  </Button>
                </View>
              </View>
              <View style={styles.copyRightView}>
                <Text>©Copyright @ Crevisoft 2019</Text>
              </View>
            </Content>
          </Root>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  item: {
    width: 370,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0.4,
    borderBottomWidth: 0.4,
    marginLeft: 15,
    marginBottom: 15,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    display: 'flex',
    marginBottom: 10,
  },
  keyboardAvoidingView: {flex: 1},
  firstView: {margin: 25},
  secondView: {alignItems: 'center', margin: 40},
  headText: {
    fontSize: 40,
    fontFamily: 'NotoKufiArabic-Regular',
  },
  buttonView: {alignItems: 'center', alignSelf: 'center'},
  button: {
    width: 250,
  },
  copyRightView: {bottom: 0, alignItems: 'center', flex: 1},
});
