import React, {Component} from "react";
import {Button, Container, Input, Item, Label, Left, Picker, Right, Text, View} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Odoo from "react-native-odoo-xmlrpc";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.odoo_ = new Odoo(global.settings);
    this.auth = global.odoo;
    this.state = {
      product: "",
      quantity: 0,
      price: 0,
      isLoading: true,
      selected: "",
      index: 0
    };
  }

  componentWillMount() {
    this.odoo_
      .authenticate().then(response => {
    var inParams = [];
    inParams.push([]);
    inParams.push(["name", "standard_price"]);
    this.odoo_
      .search_read("product.product", inParams, {})
      .then(value => {
        console.log(value);
        this.setState({all_products: value, isLoading: false});
      })
      .catch(err => console.log(err));
    });

  }

  _resetData() {
    this.setState({index: 0, quantity: null, price: null, selected: null})
  }

  _createData() {
    this.odoo_
      .authenticate().then(response => {
      this.odoo_
        .create("portal.shipments", {
          product_id: this.state.all_products[this.state.index].id,
          quantity: this.state.quantity,
          user_id: response
        })
        .then
        (x => {
          console.log(x)
        })
        .catch(err => console.log(err));
    });
  }

  _onSelectValue(value) {
    this.setState({selected: value});
  }

  _getPrice() {
    return this.state.index && this.state.all_products ? this.state.all_products[this.state.index].standard_price * this.state.quantity : 0
  }

  render() {
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
            onPress={() => {
              this._createData();
              this.props.navigation.pop();
            }}
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
            onPress={() => {
              this._createData();
              this._resetData();
            }}
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
              this.props.navigation.pop();
            }}
          >
            <Text style={{color: "#000000"}}>إالغاء</Text>
          </Button>
        </View>
        <View style={{marginBottom: 10, alignItems: "center"}}>
          <Text style={{fontSize: 30, fontWeight: "bold"}}>
            إضافة شحنة جديدة
          </Text>
        </View>
        <View style={{flex: 1, margin: 10}}>
          <Item inlineLabel rounded picker style={{margin: 5}}>
            <Picker mode={"dropdown"} selectedValue={this.state.selected}
                    onValueChange={(v, i) => {
                      this.setState({selected: v, index: i})
                    }}
                    style={{alignItems: 'center'}}
            >
              {!this.state.isLoading ? (
                this.state.all_products.map((value) => {
                  return <Picker.item value={value.id} label={value.name}/>
                })) : (<Picker.item label='None' value="-1"/>)
              }
            </Picker>
            <Label style={{fontSize: 25, fontWeight: "bold"}}>المنتج</Label>
          </Item>

          <Item inlineLabel rounded style={{margin: 5}}>
            <Input keyboardType="numeric" value={this.state.quantity} style={{textAlign: 'center'}}
                   onChangeText={quantity => this.setState({quantity})}/>
            <Label style={{fontSize: 25, fontWeight: "bold"}}>الكمية</Label>
          </Item>

          <View
            style={{
              flex: 0,
              flexDirection: "row"
            }}
          >
            <Left/>
            <Right>
              <Item inlineLabel rounded style={{margin: 5, width: 250}}>
                <Input disabled style={{textAlign: 'center'}}>
                  <Text>{this._getPrice()}</Text>
                </Input>
                <Label style={{fontSize: 25, fontWeight: "bold"}}>
                  التكلفة
                </Label>

              </Item>
            </Right>
          </View>

          <Item inlineLabel rounded picker style={{margin: 5}}>
            <Input/>
            <Label style={{fontSize: 25, fontWeight: "bold"}}>المورد</Label>
          </Item>
        </View>
      </Container>
    );
  }
}
