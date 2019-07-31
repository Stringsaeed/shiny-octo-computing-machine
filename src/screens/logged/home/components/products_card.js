import React, {Component} from "react";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
import {
  Card,
  CardItem,
  Right,
  Icon,
  Text,
  Left,
  View,
  Content,
  Radio
} from "native-base";
import {ArabicNumbers} from "react-native-arabic-numbers";
import {VictoryPie} from "victory-native";
import {BallIndicator} from "react-native-indicators";
import Odoo from "react-native-odoo-xmlrpc";
import {
  Subheading,
  Button,
  Portal,
  Dialog,
  RadioButton,
  TouchableRipple
} from "react-native-paper";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      in_stock: this.props.qty_ava,
      expired: this.props.qty_scrap,
      received: this.props.qty_rec
    });
  }

  render() {
    const {data, in_stock, expired, received} = this.state;
    if (in_stock === 0 && expired === 0 && received === 0) {
      return <Text>ليس لديك اي منتجات في المحل او منتهية او مستلمة</Text>;
    } else {
      return (
        <VictoryPie
          colorScale={["#63aabc", "#ed3833", "#60204b"]}
          data={data}
          height={300}
          width={300}
        />
      );
    }
  }
}

export default class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sold: ArabicNumbers(0),
      in_stock: ArabicNumbers(0),
      expired: ArabicNumbers(0),
      received: ArabicNumbers(0),
      isLoading: true,
      default_filter: "Current Week",
      is_checked: "WEEK",
      visible: false,

    };
    this.odoo_ = new Odoo(global.settings);
    this.auth = global.odoo;
    console.log(global.odoo)
  }

  _willMount() {
    this.odoo_
      .authenticate()
      .then(response => {
        var inParams = [];
        inParams.push([["filter_name", "=", this.state.default_filter]]);
        inParams.push([
          "quantity_products_received",
          "quantity_available_products",
          "quantity_actual_sold",
          "quantity_scrap_products"
        ]);
        this.odoo_
          .search_read("seller.home.app", inParams, {})
          .then(value => {
            console.log(value[0]);
            qty_rec = value[0].quantity_products_received;
            qty_ava = value[0].quantity_available_products;
            qty_act_sold = value[0].quantity_actual_sold;
            qty_scrap = value[0].quantity_scrap_products;
            // ---------------------------------------------
            product_chart = [
              {x: " ", y: qty_ava},
              {x: " ", y: qty_scrap},
              {x: " ", y: qty_rec}
            ];
            // ---------------------------------------------
            this.setState({
              data: product_chart,
              qty_rec: qty_rec,
              qty_ava: qty_ava,
              qty_act_sold: qty_act_sold,
              qty_scrap: qty_scrap,
              isLoading: false
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this._willMount();
  }

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  render() {
    if (!this.state.isLoading) {
      return (
        <Card
          style={{
            borderRadius: 20,
            borderWidth: 20,
            marginLeft: 15,
            marginBottom: 10,
            marginTop: 10,
            marginRight: 15,
            evolution: 6,
            padding: 10
          }}
        >
          <CardItem header bordered>
            <Left>
              <Icon
                name="filter-variant"
                type="MaterialCommunityIcons"
                onPress={() => {
                  this._showDialog();
                }}
              />

              <Portal>
                <Dialog
                  visible={this.state.visible}
                  onDismiss={this._hideDialog}
                >
                  <Dialog.Title>إختار</Dialog.Title>
                  <Dialog.ScrollArea
                    style={{maxHeight: 170, paddingHorizontal: 0}}
                  >
                    <ScrollView>
                      <View>
                        <TouchableRipple
                          onPress={() => this.setState({is_checked: "TODAY"})}
                        >
                          <View style={styles.row}>
                            <View pointerEvents="none">
                              <RadioButton
                                value="TODAY"
                                status={
                                  this.state.is_checked === "TODAY"
                                    ? "checked"
                                    : "unchecked"
                                }
                              />
                            </View>
                            <Left>
                              <Subheading style={styles.text}>اليوم</Subheading>
                            </Left>
                          </View>
                        </TouchableRipple>
                        <TouchableRipple
                          onPress={() => this.setState({is_checked: "WEEK"})}
                        >
                          <View style={styles.row}>
                            <View pointerEvents="none">
                              <RadioButton
                                value="WEEK"
                                status={
                                  this.state.is_checked === "WEEK"
                                    ? "checked"
                                    : "unchecked"
                                }
                              />
                            </View>
                            <Subheading style={styles.text}>
                              هذا الاسبوع
                            </Subheading>
                          </View>
                        </TouchableRipple>
                        <TouchableRipple
                          onPress={() => {
                            this.setState({
                              is_checked: "MONTH",
                              default_filter: "Current Month"
                            });
                          }}
                        >
                          <View style={styles.row}>
                            <View pointerEvents="none">
                              <RadioButton
                                value="MONTH"
                                status={
                                  this.state.is_checked === "MONTH"
                                    ? "checked"
                                    : "unchecked"
                                }
                              />
                            </View>
                            <Subheading style={styles.text}>
                              هذا الشهر
                            </Subheading>
                          </View>
                        </TouchableRipple>
                        <TouchableRipple
                          onPress={() => {
                            this.setState({
                              is_checked: "ALL",
                              default_filter: "All"
                            });
                          }}
                        >
                          <View style={styles.row}>
                            <View pointerEvents="none">
                              <RadioButton
                                value="ALL"
                                status={
                                  this.state.is_checked === "ALL"
                                    ? "checked"
                                    : "unchecked"
                                }
                              />
                            </View>
                            <Subheading style={styles.text}>الكل</Subheading>
                          </View>
                        </TouchableRipple>
                      </View>
                    </ScrollView>
                  </Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button onPress={this._hideDialog}>إالغاء</Button>
                    <Button
                      onPress={() => {
                        this._hideDialog();
                        this.setState({isLoading: true});
                        this.forceUpdate();
                      }}
                    >
                      صفي
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </Left>
            <Right>
              <Text style={{fontWeight: "bold", fontSize: 40}}>المنتجات</Text>
            </Right>
          </CardItem>
          {/* --------------- */}
          <CardItem style={{justifyContent: "center", flex: 1}}>
            <Chart
              data={this.state.data}
              total_payments={this.state.qty_ava}
              received_payments={this.state.qty_act_sold}
              remaining_payments={this.state.qty_scrap}
            />
          </CardItem>
          {/* --------------- */}
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.qty_act_sold)}</Text>
            </Left>
            <Content/>
            <Right style={{flex: 1, width: 100}}>
              <Text style={{fontWeight: "bold", fontSize: 25}}>
                المنتجات المباعة
              </Text>
            </Right>
          </CardItem>
          {/*  */}
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.qty_ava)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#63aabc",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>المنتجات بالمحل</Text>
            </Right>
          </CardItem>
          {/*  */}
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.qty_scrap)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#ed3833",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>منتجات منتهية</Text>
            </Right>
          </CardItem>
          {/*  */}
          <CardItem
            style={{
              flex: 1,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              marginBottom: 20
            }}
          >
            <Left>
              <Text>{ArabicNumbers(this.state.qty_rec)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#60204b",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>المنتجات المستلمة</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else {
      return (
        <Card
          style={{
            borderRadius: 8,
            marginLeft: 15,
            marginBottom: 10,
            marginTop: 10,
            marginRight: 15,
            evolution: 6,
            padding: 10
          }}
        >
          <CardItem>
            <Left/>
            <Right>
              <Text style={{fontWeight: "bold", fontSize: 40}}>المنتجات</Text>
            </Right>
          </CardItem>
          <CardItem
            style={{
              flex: 1,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              marginBottom: 20
            }}
          >
            <View style={{flex: 1}}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                <BallIndicator color="#540e33"/>
              </View>
            </View>
          </CardItem>
        </Card>
      );
    }
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    paddingLeft: 8
  }
});
