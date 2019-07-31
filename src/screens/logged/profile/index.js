import React, {Component} from "react";
import {Card, Text, CardItem, Container, Right, Body} from "native-base";
import Ionicons, {Button} from "react-native-vector-icons/Ionicons";
import {IconButton} from "react-native-paper";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "هنا اسم مالك الحساب",
      phone: "هنا رقم هاتف مالك الحساب",
      email: "هنا البريد الاليكتروني لمالك الحساب",
      company: "هنا اسم شركة مالك الخساب",
      isLoading: true
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <Container>
        <Card transparent style={{marginBottom: 20}}>
          <CardItem bordered>
            <Body>
              <Text>{this.state.name}</Text>
            </Body>
            <Right>
              <Text style={{textAlign: "right", textAlignVertical: "center"}}>
                الاسم
              </Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.phone}</Text>
            </Body>
            <Right>
              <Text style={{textAlign: "right", textAlignVertical: "center"}}>
                رقم الهاتف
              </Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.email}</Text>
            </Body>
            <Right>
              <Text style={{textAlign: "right", textAlignVertical: "center"}}>
                البريد الاليكتروني
              </Text>
            </Right>
          </CardItem>
          <CardItem style={{alignItems: "center", justifyContent: 'center'}}>
            <Button
              backgroundColor="#de356a"
              name="md-log-out"
              color="#fdc8b7"
              borderRadius={10}
              size={50}
              style={{alignItems: "center", justifyContent: "center", width: 250, height: 50}}
              onPress={() => {
                this.props.navigation.navigate("LoginComponent")
              }}
            />
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default index;
