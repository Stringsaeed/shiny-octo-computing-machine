import React, {Component} from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native'
import {Container, Text, Form, Button, Item, View, Label, Input, Icon, Root, Toast} from "native-base";
import Odoo from "react-native-odoo-xmlrpc";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUrl: "https://seller.crevisoft.com/mobile_login/"
    }
  }

  _fetchData() {
    fetch(this.state.loginUrl, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
        mobile_device: "XXXX",
        mobile_platform: "XXXX"
      })
    })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.respond === "success") {
          const request_settings = {
            url: `${responseJson.protocol}://${responseJson.server}`,
            username: responseJson.username,
            password: responseJson.password,
            db: responseJson.db
          };
          global.settings = {
            url: `${responseJson.protocol}://${responseJson.server}`,
            username: responseJson.username,
            password: responseJson.password,
            db: responseJson.db
          };
          global.odoo = new Odoo({
            url: `${responseJson.protocol}://${responseJson.server}`,
            username: responseJson.username,
            password: responseJson.password,
            db: responseJson.db
          });
          console.log(settings)
          this.props.navigation.navigate("AppComponent")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  _onClick = () => {
    if (this.state.email) {
      if (this.state.password) {
        this._fetchData();
      } else {
        Toast.show({
          text: "من فضلك ادخل رمز الدخول",
          duration: 5000,
          type: "warning"
        });
      }
    } else {
      return Toast.show({
        text: "من فضلك ادخل رقم الجوال او البريد الاليكتروني",
        duration: 5000,
        type: "warning"
      });
    }
  }

  render() {
    return (
      <Root>
        <Container>
          <View style={{margin: 25}}>
            <View style={{alignItems: 'center', margin: 40}}>
              <Image style={styles.logo}
                     source={{uri: "https://www.webfx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png"}}/>
              <Text style={{fontWeight: "bold", fontSize: 40,}}>
                تسجيل الدخول
              </Text>
            </View>
            <ScrollView>
              <View style={styles.view}>
                <Form>
                  <Text style={styles.text}>البريد الاليكتروني</Text>
                  <Item style={styles.item}>
                    <Icon name='person'/>
                    <Input onChangeText={(email) => this.setState({email: email})}/>
                  </Item>
                  <Text style={styles.text}>كلمة المرور</Text>
                  <Item style={styles.item}>
                    <Icon name='lock'/>
                    <Input secureTextEntry
                           onChangeText={password => this.setState({password})}
                    />
                  </Item>
                </Form>
              </View>
              <View style={{alignItems: 'center', alignSelf: "center",}}>
                <Button iconLeft color="black"
                        style={{
                          width: 250,
                          alignItems: 'center',
                          justifyContent: "center",
                          borderRadius: 15,
                          backgroundColor: '#de356a'
                        }}
                        onPress={this._onClick}
                >
                  <Icon type="MaterialCommunityIcons" name='login'/>
                  <Text style={{fontWeight: 'bold', alignSelf: "center", alignItems: 'center'}}>تسجيل
                    الدخول</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
          <KeyboardAvoidingView enabled={false}
                                style={{bottom: 0, alignItems: 'center', flex: 1}}>
            <Text>©Copyright @ Crevisoft 2019</Text>
          </KeyboardAvoidingView>
        </Container>
      </Root>
    )
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
    marginBottom: 15
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: "center",
    textAlign: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    display: "flex",
    marginBottom: 10,
  },
});
