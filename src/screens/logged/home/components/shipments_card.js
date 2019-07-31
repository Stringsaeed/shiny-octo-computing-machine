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
    this.odoo = new Odoo(global.settings);
    this.auth = global.odoo
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      in_transit: this.props.in_transit,
      approved: this.props.approved,
      rejected: this.props.rejected
    });
  }

  render() {
    const {data, in_transit, approved, rejected} = this.state;
    if (in_transit === 0 && approved === 0 && rejected === 0) {
      return <Text>ليس لديك اي شحنات في الطريق او مرفوضة او مستلمة</Text>;
    } else {
      return (
        <VictoryPie
          colorScale={["#ff8080", "#ffba92", "#c6f1d6"]}
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
      total: ArabicNumbers(0),
      in_transit: ArabicNumbers(0),
      approved: ArabicNumbers(0),
      rejected: ArabicNumbers(0),
      screenWidth: Dimensions.get("window").width,
      isLoading: true,
      default_filter: "Current Week",
      is_checked: "WEEK",
      visible: false
    };
    this.odoo_ = new Odoo(global.settings);
    this.auth = global.odoo;
    console.log(global.odoo)
  }

  _WillMount() {
    this.odoo_
      .authenticate()
      .then(response => {
        var inParams = [];
        inParams.push([["filter_name", "=", this.state.default_filter]]);
        inParams.push([
          "total_shipments",
          "total_shipments_in_transit",
          "total_shipments_shipped",
          "total_shipments_rejected"
        ]);
        this.odoo_
          .search_read("seller.home.app", inParams, {})
          .then(value => {
            console.log(value[0]);
            total_shipments = value[0].total_shipments;
            in_transit = value[0].total_shipments_in_transit;
            approved = value[0].total_shipments_shipped;
            rejected = value[0].total_shipments_rejected;
            // ---------------------------------------------
            shipment_chart = [
              {x: " ", y: in_transit},
              {x: " ", y: approved},
              {x: " ", y: rejected}
            ];
            // ---------------------------------------------
            this.setState({
              data: shipment_chart,
              total: total_shipments,
              in_transit: in_transit,
              approved: approved,
              rejected: rejected,
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

  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

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
                          onPress={() => this.setState({is_checked: "TODAY", default_filter: "Today"})}
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
                          onPress={() => this.setState({is_checked: "WEEK", default_filter: "Current Week"})}
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
              <Text style={{fontWeight: "bold", fontSize: 40}}>الشحنات</Text>
            </Right>
          </CardItem>
          <CardItem style={{justifyContent: "center", flex: 1}}>
            <Chart
              data={this.state.data}
              in_transit={this.state.in_transit}
              rejected={this.state.rejected}
              approved={this.state.approved}
            />
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.total)}</Text>
            </Left>
            <Content/>
            <Right style={{flex: 1}}>
              <Text>المرسلة</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.in_transit)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#ff8080",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>في الطريق</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Text>{ArabicNumbers(this.state.approved)}</Text>
            </Left>
            <Content style={{flex: 1}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#ffba92",
                  alignSelf: "center"
                }}
              />
            </Content>
            <Right style={{flex: 1}}>
              <Text>المستلمة</Text>
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
              <Text>{ArabicNumbers(this.state.rejected)}</Text>
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
              <Text>المرفوضة</Text>
            </Right>
          </CardItem>
        </Card>
      );
    } else {
      this._WillMount();
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
              <Text style={{fontWeight: "bold", fontSize: 40}}>الشحنات</Text>
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
