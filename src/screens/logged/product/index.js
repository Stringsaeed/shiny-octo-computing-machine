import React, {Component} from "react";
import {
  Card,
  CardItem,
  Text,
  Left,
  Right,
  View,
  Content,
  Icon,
  Button
} from "native-base";
import Odoo from "react-native-odoo-xmlrpc";
import {FlatList} from "react-native-gesture-handler";
import {ArabicNumbers} from "react-native-arabic-numbers";
import {BallIndicator} from "react-native-indicators";
import Barcode from "react-native-barcode-builder";
import Filters from "../../common/filters";
import {Button as ButtonPaper, Dialog, Portal, RadioButton, Subheading, TouchableRipple} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var translate_state;
    const {name, price, categ, removal_time, state, barcode} = this.props;
    if (state === "draft") {
      translate_state = "في المخزن";
    } else if (state === "approved") {
      translate_state = "مستلمة";
    } else {
      translate_state = "مرفوضة";
    }

    return (
      <Card>
        <CardItem style={{flex: 1}}>
          <Left style={{width: 50}}>
            <Barcode value={barcode} format="CODE128" width={1}/>
          </Left>
          <Right style={{flex: 1, flexDirection: "column"}}>
            <View style={{flex: 1, flexDirection: "row", height: 30}}>
              <Left style={{flex: 1}}>
                <Text style={{textAlign: "right"}}>{name}</Text>
              </Left>
              <Right style={{flex: 1}}>
                <Text>المنتج</Text>
              </Right>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Left style={{flex: 1}}>
                <Text style={{textAlign: "right"}}>
                  {ArabicNumbers(price)}
                </Text>
              </Left>
              <Right style={{flex: 1}}>
                <Text>سعر البيع</Text>
              </Right>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Left style={{flex: 1}}>
                <Text style={{textAlign: "right"}}>
                  {ArabicNumbers(categ)}
                </Text>
              </Left>
              <Right style={{flex: 1}}>
                <Text>الفئة</Text>
              </Right>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Left style={{flex: 1, flexDirection: "row"}}>
                <Text>{ArabicNumbers(removal_time)}</Text>
              </Left>
              <Right style={{flex: 1}}>
                <Text>انتهاء الصلاحية</Text>
              </Right>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Left style={{flex: 1}}>
                <Text>{translate_state}</Text>
              </Left>
              <Right style={{flex: 1}}>
                <Text>الحالة</Text>
              </Right>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default class ShipmentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, data: [], fetching_data: false, default_filter: "Current Week",
      is_checked: "WEEK",
      visible: false,
      offset: 0,
      limit: 10
    };
    this.filter = "WEEK";
      this.odoo_ = new Odoo(global.settings);
      this.auth = global.odoo;
  }

  _fetchData(handle) {
      this.odoo_
        .authenticate().then(response => {
      const inParams = new Filters(this.filter).getInParam();
      inParams.push([
        "name",
        "standard_price",
        "categ_id",
        "removal_time",
        "portal_state",
        "barcode"
      ]);
      this.odoo_
        .search_read("product.template", inParams, {offset: this.state.offset, limit: this.state.limit})
        .then(value => {
          this.setState({data: value, [handle]: false});
        }).catch(err => {
        console.log(err);
      });

    })
  }
    componentWillMount() {
        console.log(global.odoo);
        let handle = "isLoading";
        this._getLimit();
        this._fetchData(handle);
    }
    _getLimit() {
        this.odoo_
          .authenticate().then(response => {
            const inParams = new Filters(this.filter).getInParam();
            this.odoo_
              .search_count("product.template", inParams)
              .then(value => {
                  alert(value);
                  this.setState({lenProducts: value})
              }).catch(err => {
                alert(err);
                console.log(err)
            })
        });
    }

    _updateList(_state) {
        let handle = "fetching_data";
        if (_state === 'in') {
            this.setState({offset: this.state.offset + this.state.limit})
        } else {
            this.setState({offset: this.state.offset - this.state.limit})
        }
        this.setState({[handle]: true}, () => {
            this._fetchData(handle)
        })
    }
    _showDialog = () => this.setState({visible: true});

    _hideDialog = () => this.setState({visible: false});
  _keyExtractor = (item, index) => item.id.toString();
    _renderFooter() {
        if (!this.state.fetching_data) {
            return (
              <View style={{alignItems: 'center', flex: 1, flexDirection: 'row'}}>
                  {this.state.offset + this.state.limit > this.state.lenProducts || this.statelimit === this.state.lenProducts ?
                    <Left/> : (<Left>
                        <Button transparent style={{justifyContent: "center"}} onPress={() => {
                            this._updateList("in")
                        }}>
                            <Text style={{textAlign: "right", color: "#ff8080", fontWeight: "bold"}}>التالي</Text>
                        </Button>
                    </Left>)}
                  <Content/>
                  {this.state.offset === 0 ? <Right/> : (<Right>
                      <Button transparent style={{justifyContent: "center"}} onPress={() => {
                          this._updateList("de")
                      }}>
                          <Text style={{textAlign: "right", color: "#ff8080", fontWeight: "bold"}}>السابق</Text>
                      </Button>
                  </Right>)}
              </View>
            )
        } else {
            return (
              <View style={{justifyContent: "center", alignItems: "center", flex: 1, paddingBottom: 10}}>
                  <BallIndicator color="#540e33" size={30}/>
              </View>
            )
        }
    }
  render() {
    if (!this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              marginTop: 10,
              marginRight: 5,
              marginLeft: 5,
              marginBottom: 10,
              borderRadius: 8,
              borderWidth: 2,
              height: 50,
              flexDirection: "row",
              borderColor: "#d3d3d3"
            }}
          >
            <Left
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
                <Button transparent onPress={() => {
                    this._showDialog()
                }}>
                    <Icon name="filter-outline" type="MaterialCommunityIcons"/>
                </Button>
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
                                      onPress={() => {
                                          this.setState({is_checked: "TODAY"});
                                          this.filter = "TODAY"
                                      }}
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
                                            <Right>
                                                <Subheading style={styles.text}>اليوم</Subheading>
                                            </Right>
                                        </View>
                                    </TouchableRipple>

                                    <TouchableRipple
                                      onPress={() => {
                                          this.setState({is_checked: "WEEK"});
                                          this.filter = "WEEK"
                                      }}
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
                                              is_checked: "MONTH"
                                          });
                                          this.filter = "MONTH"
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
                                              is_checked: "ALL"
                                          });
                                          this.filter = "ALL"
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
                            <ButtonPaper onPress={this._hideDialog}>إلفاء</ButtonPaper>
                            <ButtonPaper
                              onPress={() => {
                                  this._hideDialog();
                                  this._getLimit()
                                  this.setState({isLoading: true, offset: 0, limit: 10});
                                  this._fetchData("isLoading");
                                  this.forceUpdate();
                              }}
                            >
                                صفي
                            </ButtonPaper>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate("ProductCreate");
                }}
              >
                <Icon name="ios-add-circle-outline"/>
              </Button>
            </Left>
            <Content/>
            <Right style={{marginRight: 5}}>
              <Text>عرض المنتجات</Text>
            </Right>
          </View>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <ProductItem
                name={item.name}
                price={item.standard_price}
                categ={item.categ_id[1]}
                removal_time={item.removal_time}
                state={item.portal_state}
                barcode={item.barcode}
              />
            )}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this._renderFooter.bind(this)}
          />
        </View>
      );
    } else {
      return (
        <Card
          transparent
          style={{
            marginLeft: 15,
            marginBottom: 10,
            marginTop: 20,
            marginRight: 15
          }}
        >
          <CardItem
            style={{
              flex: 1,
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
