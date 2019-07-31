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

  componentWillMount() {
    this.setState({
      data: this.props.data,
      total_payments: this.props.total_payments,
      received_payments: this.props.received_payments,
      remaining_payments: this.props.remaining_payments,
      price_scrap: this.props.price_scrap
    });
  }

  render() {
    const {
      data,
      total_payments,
      received_payments,
      remaining_payments,
      price_scrap
    } = this.state;
    if (
      total_payments === 0 &&
      received_payments === 0 &&
      remaining_payments === 0 &&
      price_scrap === 0
    ) {
      return <Text>ليس لديك اي حسابات في مستلمة او متبقة او تالفة</Text>;
    } else {
      return (
        <VictoryPie
          colorScale={["#5d50c6", "#f85e9f", "#facd49", "#c6f1d6"]}
          data={data}
          height={300}
          width={300}
        />
      );
    }
  }
}

export default class ShipmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent_value: ArabicNumbers(0),
      in_transit: ArabicNumbers(0),
      approved: ArabicNumbers(0),
      rejected: ArabicNumbers(0),
      screenWidth: Dimensions.get("window").width,
      isLoading: true,
      default_filter: "Current Week",
      is_checked: "WEEK",
      visible: false,
    };
    this.odoo_ = new Odoo(global.settings);
    this.auth = global.odoo;
    console.log(global.odoo)
  }

  componentWillMount() {
    if (this.props.refreshing) {
      this.setState({isLoading: true});
    }
  }

  _willMount() {
    this.odoo_
      .authenticate()
      .then(response => {
        var inParams = [];
        inParams.push([["filter_name", "=", this.state.default_filter]]);
        inParams.push([
          "total_price_shipments",
          "total_payments",
          "total_received_payments",
          "total_remaining_payments",
          "total_price_scrap"
        ]);
        this.odoo_
          .search_read("seller.home.app", inParams, {})
          .then(value => {
            console.log(value[0]);
            shipments_price = value[0].total_price_shipments;
            total_payments = value[0].total_payments;
            received_payments = value[0].total_received_payments;
            remaining_payments = value[0].total_remaining_payments;
            price_scrap = value[0].total_price_scrap;
            // ---------------------------------------------
            accounting_chart = [
              {x: " ", y: total_payments},
              {x: " ", y: received_payments},
              {x: " ", y: remaining_payments},
              {x: " ", y: price_scrap}
            ];
            // ---------------------------------------------
            this.setState({
              data: accounting_chart,
              shipments_price: shipments_price,
              total_payments: total_payments,
              received_payments: received_payments,
              remaining_payments: remaining_payments,
              price_scrap: price_scrap,
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

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  render() {
    if (!this.state.isLoading) {
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
                          onPress={() =>
                            this.setState({
                              is_checked: "TODAY",
                              default_filter: "Today"
                            })
                          }
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
                          onPress={() =>
                            this.setState({
                              is_checked: "WEEK",
                              default_filter: "Current Week"
                            })
                          }
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
                      }}
                    >
                      صفي
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </Left>
            <Right>
              <Text style={{fontWeight: "bold", fontSize: 40}}>الحسابات</Text>
            </Right>
          </CardItem>
          <CardItem style={{justifyContent: "center", flex: 1}}>
            <Chart
              data={this.state.data}
              total_payments={this.state.total_payments}
              received_payments={this.state.received_payments}
              remaining_payments={this.state.remaining_payments}
              price_scrap={this.state.price_scrap}
            />
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.shipments_price)}</Text>
            </Left>
            <Content/>
            <Right style={{flex: 1}}>
              <Text>إجمالي الحسابات</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.total_payments)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#5d50c6",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>إجمالي المبيعات</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.received_payments)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#f85e9f",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>المبالغ المستلمة</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.remaining_payments)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#facd49",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>المبالغ المتبقية</Text>
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
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.price_scrap)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#c6f1d6",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>قيمة التالف</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else {
      this._willMount();
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
              <Text style={{fontWeight: "bold", fontSize: 40}}>الحسابات</Text>
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
