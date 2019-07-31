import React, {Component} from "react";
import {
  Button,
  View,
  Container,
  Item,
  Input,
  Label,
  Form,
  Left,
  Text,
  Right
} from "native-base";
import {ArabicNumbers} from "react-native-arabic-numbers";
import Ionicons from "react-native-vector-icons/Ionicons";
import Odoo from "react-native-odoo-xmlrpc";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expire_days: 5,
      product: "",
      cate: "",
      price: "",
      responsible: "",
      comission: 10
    };
    this.odoo_ = new Odoo(global.settings);

  }

  componentWillMount() {
    // cat
    this.odoo_
      .authenticate()
      .then(response => {

        var inParams_cat = [];
        inParams_cat.push([]);
        inParams_cat.push(['name']); //fields\
        this.odoo_
          .search_read("product.category", inParams_cat, {})
          .then(list => {
            console.log(list)
            this.setState({categories: list})
          }).catch(err => {
          console.log(err)
        });

        var inParams_group = [];
        inParams_group.push([["name", "=", "Seller Manager"]]);
        inParams_group.push(['id']); //fields\
        this.odoo_
          .search_read("res.groups", inParams_group, {})
          .then(groups => {
            console.log(groups);
            this.setState({manager_group: groups[0]})
          }).catch(err => {
          console.log(err)
        });

        var inParams_user = [];
        inParams_user.push([["id", "=", response]]);
        inParams_user.push(["display_name", "email", "phone", "groups_id", "company_id"]);
        // "display_name", "email", "phone", "groups_id"
        this
          .odoo_
          .search_read("res.users", inParams_user, {})
          .then(res => {
            console.log(res);
            this.setState({
              manager: res[0].groups_id.includes(this.state.manager_group) || false,
              name: res[0].display_name
            })
          });
        if (this.state.manager) {
          var inParams = [];
          inParams.push([]);
          inParams.push(['name']);
          this
            .odoo_
            .search_read("res.users", inParams, {})
            .then(list => {
              console.log(list);
              this.setState({response: list, disabled: false})
              console.log(this.state)
            })
        } else {
          this.setState({response: this.state.name})
          console.log(this.state)
        }
        console.log(this.state)
      });
    console.log(this.state)
  }

  _decrement() {
    let expire;
    expire = this.state.expire_days;
    if (expire !== 0) {
      this.setState({expire_days: expire - 1});
    }
  }

  _increment() {
    let expire;
    expire = this.state.expire_days;
    this.setState({expire_days: expire + 1});
  }

  render() {
    let expire = this.state.expire_days;
    return (
      <Container style={{flex: 1}}>
        <View
          style={{
            marginTop: 10,
            marginRight: 5,
            marginLeft: 5,
            marginBottom: 10,
            flexDirection: "row"
          }}
        >
          <Button
            rounded
            style={{
              backgroundColor: "#ff8080",
              width: "40%",
              flex: 1,
              marginRight: 5,
              marginLeft: 5
            }}
            iconLeft
          >
            <Ionicons name="md-save" size={30}/>
            <Text>حفظ</Text>
          </Button>
          <Button
            rounded
            style={{
              backgroundColor: "#60204b",
              width: "40%",
              flex: 1,
              marginHorizontal: 10,
              justifyContent: "center"
            }}
            iconLeft
          >
            <Ionicons name="md-save" size={30} color="#ffffff"/>
            <Text>حفظ وجديد</Text>
          </Button>
          <Button
            rounded
            style={{
              backgroundColor: "#feff00",
              width: "20%",
              marginRight: 5,
              marginLeft: 5
            }}
            onPress={() => {
              this.props.navigation.pop()
            }}
          >
            <Text style={{color: "#000000"}}>إالغاء</Text>
          </Button>
        </View>
        <View style={{marginBottom: 10, alignItems: "center"}}>
          <Text style={{fontSize: 30}}>إضافة منتج</Text>
        </View>
        <View style={{flex: 1, margin: 10}}>
          <Item inlineLabel regular style={{margin: 5}}>
            <Input/>
            <Label style={{fontSize: 25, fontWeight: "bold"}}>المنتج</Label>
          </Item>

          <Item inlineLabel regular picker style={{margin: 5}}>
            <Input/>
            <Label style={{fontSize: 25, fontWeight: "bold"}}>الفئة</Label>
          </Item>

          <View
            style={{
              flex: 0,
              flexDirection: "row"
            }}
          >
            <Left/>
            <Right>
              <Item inlineLabel regular style={{margin: 5, width: 250}}>
                <Input style={{width: 50}}/>
                <Label style={{fontSize: 25, fontWeight: "bold"}}>
                  سعر البيع
                </Label>
              </Item>
            </Right>
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: "row"
            }}
          >
            <Left/>
            <Right>
              <Item inlineLabel regular style={{margin: 5, width: 250}}>
                <Input style={{width: 50}}/>
                <Label style={{fontSize: 25, fontWeight: "bold"}} placeholder={this.state.comission+"%"}>
                  عمولة التاجر
                </Label>
              </Item>
            </Right>
          </View>

          <Item inlineLabel regular picker style={{margin: 5}}>
            <Input/>
            <Label style={{fontSize: 25, fontWeight: "bold"}}>المسئول</Label>
          </Item>
          <View
            style={{
              flex: 0,
              flexDirection: "row"
            }}
          >
            <Left/>
            <Right>
              <Item regular style={{margin: 5, width: 250}}>
                <Ionicons
                  name="md-arrow-dropup"
                  size={32}
                  style={{paddingLeft: 10}}
                  onPress={this._increment.bind(this)}
                />
                <View style={{flex: 1, alignItems: "center"}}>
                  <Text>
                    {ArabicNumbers(expire)}
                  </Text>
                </View>
                <Ionicons
                  name="md-arrow-dropdown"
                  size={32}
                  style={{paddingRight: 10}}
                  onPress={this._decrement.bind(this)}
                />
                <Label style={{fontSize: 25, fontWeight: "bold"}}>
                  فترة إزالة المنتج
                </Label>
              </Item>
            </Right>
          </View>
        </View>
      </Container>
    );
  }
}
