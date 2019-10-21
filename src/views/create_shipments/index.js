import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  I18nManager,
} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {Button, TextInput, HelperText} from 'react-native-paper';
import {
  Container,
  Item,
  Label,
  Text,
  View,
  Picker,
  Right,
  Left,
  Input,
  Col,
  Row,
} from 'native-base';
import {ArabicNumbers} from 'react-native-arabic-numbers';

import {SearchDialog} from '../../components';
// import {FlatListModel} from '../../components/flatlistModel';

export class CreateShipment extends Component {
  constructor(props) {
    super(props);
    this.props.fetch();
    this.state = {
      quantity: 0,
      price: 0,
      selectedProduct: {},
      selectedResponsible: {},
      selectedProductResponsible: [],
      productVisible: false,
      responsibleVisible: false,
    };
  }

  _getPrice() {
    const {selectedProduct, quantity} = this.state;
    return selectedProduct ? selectedProduct.standard_price * quantity : 0;
  }

  showDialog = () => {
    this.setState({visible: true});
  };
  hideDialog = () => {
    this.setState({visible: false});
  };

  render() {
    const {
      selectedProduct,
      productVisible,
      quantity,
      selectedResponsible,
      selectedProductResponsible,
      responsibleVisible,
    } = this.state;
    const {
      products,
      isLoading,
      isSending,
      isAdmin,
      searchProducts,
      isSearchingProducts,
      searchUsers,
      isSearchingUsers,
      currentUser,
      users,
      searchProductsAction,
      searchUsersAction,
    } = this.props;

    return !isLoading ? (
      <Container styles={styles.flex}>
        {/* <Item inlineLabel rounded style={styles.item}> */}
        <Button onPress={() => this.setState({productVisible: true})}>
          {selectedProduct ? selectedProduct.name : 'اختر منتج'}
        </Button>
        <SearchDialog
          data={
            isAdmin
              ? products
              : searchProducts !== []
              ? searchProducts
              : products
          }
          search={term => {
            searchProductsAction(term);
          }}
          searchBar={isAdmin}
          isSearching={isSearchingProducts}
          visible={productVisible}
          title="اختر منتج"
          onSelect={_product => {
            this.setState({
              selectedProduct: _product,
              selectedProductResponsible: _product.responsible_id[1],
              productVisible: false,
            });
          }}
        />
        <Label style={styles.text(25)}>المنتج</Label>
        {/* </Item> */}
        <Item inlineLabel rounded style={styles.item}>
          <Input
            keyboardType="numeric"
            value={String(quantity)}
            style={styles.centerTextInput}
            onChangeText={_quantity => {
              this.setState({quantity: _quantity});
            }}
          />
          <Label style={styles.text(25)}>الكمية</Label>
        </Item>
        <Item inlineLabel rounded style={styles.item}>
          <Input disabled style={styles.centerTextInput}>
            <Text style={styles.text(25)}>
              {ArabicNumbers(this._getPrice() || 0)}
            </Text>
          </Input>
          <Label style={styles.text(25)}>التكلفة</Label>
        </Item>
        <Item inlineLabel rounded disabled={!isAdmin} style={styles.item}>
          {!isAdmin ? (
            <Input disabled={!isAdmin} style={styles.centerTextInput}>
              <Text style={styles.text(25)}>{currentUser.display_name}</Text>
            </Input>
          ) : (
            <Button onPress={() => this.setState({visible: true})}>
              {selectedResponsible
                ? selectedResponsible.name
                : selectedProductResponsible
                ? selectedProductResponsible[1]
                : 'اختر مورد'}
            </Button>
          )}
          <SearchDialog
            data={searchUsers || users}
            search={term => {
              searchUsersAction(term);
            }}
            isSearching={isSearchingUsers}
            visible={responsibleVisible}
            title="اختر مورد"
            onSelect={_responsible => {
              this.setState({
                selectedResponsible: _responsible,
                responsibleVisible: false,
              });
            }}
          />
          <Label style={styles.text(25)}>المورد</Label>
        </Item>
      </Container>
    ) : (
      <View style={styles.indicator}>
        <BallIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsView: {
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  form: {
    flex: 1,
  },
  flex: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#ff8080',
    width: '40%',
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  text: fontSize => ({
    fontSize: fontSize || 25,
    fontFamily: 'NotoKufiArabic',
  }),
  titleView: {
    marginBottom: 10,
    alignItems: 'center',
  },
  formView: {
    flex: 1,
    margin: 10,
  },
  centerTextInput: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderRadius: 8,
    marginHorizontal: '1.5%',
    marginVertical: '2%',
  },
});

/*
*
* <Root>
        <Container style={styles.flex}>
          <View style={styles.buttonsView}>
            <Button
              rounded
              style={styles.button}
              disabled={isSending}
              iconLeft
              onPress={() => {
                this._createData(true);
              }}>
              <Icon name="md-save" size={30} />
              <Text style={styles.text}>حفظ</Text>
            </Button>
            <Button
              rounded
              disabled={isSending}
              style={styles.button}
              iconLeft
              onPress={() => {
                this._createData(false);
              }}>
              <Icon name="md-save" size={30} />
              <Text style={styles.text}>حفظ وجديد</Text>
            </Button>
            <Button
              rounded
              style={styles.button}
              onPress={() => {
                this._resetData();
                this.props.navigation.pop();
              }}>
              <Text style={styles.text}>إالغاء</Text>
            </Button>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.text(30)}>إضافة شحنة جديدة</Text>
          </View>
          {!isLoading ? (
            <View style={styles.formView}>
              <Item inlineLabel rounded picker style={{margin: 5}}>
                <Picker
                  mode={'dialog'}
                  selectedValue={this.state.selected}
                  onValueChange={(v, i) => {
                    const vendor = products[i - 1].responsible_id;
                    if (!disabled) {
                      this.setState({
                        selected: v,
                        index: i,
                        response: vendor[1],
                        responsible_id: vendor[0],
                      });
                    } else {
                      this.setState({
                        selected: v,
                        index: i,
                      });
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    fontFamily: 'NotoKufiArabic-Regular',
                  }}
                  placeholder="إختر الفئة"
                  itemTextStyle={{fontFamily: 'NotoKufiArabic-Regular'}}
                  textStyle={{fontFamily: 'NotoKufiArabic-Regular'}}>
                  <Picker.Item value="" label={'إختر المنتج'} />
                  {products.map(value => {
                    return <Picker.item value={value.id} label={value.name} />;
                  })}
                </Picker>
                <Label
                  style={{fontSize: 25, fontFamily: 'NotoKufiArabic-Bold'}}>
                  المنتج
                </Label>
              </Item>

              <Item inlineLabel rounded style={{margin: 5}}>
                <Input
                  keyboardType="numeric"
                  value={String(this.state.quantity)}
                  style={{textAlign: 'center'}}
                  onChangeText={quantity => this.setState({quantity})}
                />
                <Label
                  style={{fontSize: 25, fontFamily: 'NotoKufiArabic-Bold'}}>
                  الكمية
                </Label>
              </Item>

              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                }}>
                <Left />
                <Right>
                  <Item inlineLabel rounded style={{margin: 5, width: 250}}>
                    <Input disabled style={{textAlign: 'center'}}>
                      <Text style={styles.text}>{this._getPrice()}</Text>
                    </Input>
                    <Label
                      style={{
                        fontSize: 25,
                        fontFamily: 'NotoKufiArabic-Bold',
                      }}>
                      التكلفة
                    </Label>
                  </Item>
                </Right>
              </View>

              <Item
                inlineLabel
                rounded
                picker={!disabled}
                disabled={disabled}
                style={{margin: 5}}>
                {disabled ? (
                  <Input
                    disabled={disabled}
                    style={{
                      textAlign: 'center',
                    }}>
                    <Text style={styles.text}>{responsible.display_name}</Text>
                  </Input>
                ) : (
                  <Picker
                    mode={'dialog'}
                    placeholder="إختر المسئول"
                    onValueChange={(v, i) => {
                      this.setState({
                        responsibleId: v,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                    }}
                    selectedValue={this.responsible.display_name}
                    itemTextStyle={styles.text}
                    textStyle={styles.text}>
                    <Picker.Item value="" label={'إختر المورد'} />
                    {responsible.map(_response => {
                      return (
                        <Picker.item
                          value={_response.id}
                          label={_response.display_name}
                        />
                      );
                    })}
                  </Picker>
                )}
                <Label
                  style={{fontSize: 25, fontFamily: 'NotoKufiArabic-Bold'}}>
                  المورد
                </Label>
              </Item>
            </View>
          ) : (
            <BallIndicator />
          )}
        </Container>
      </Root>
      * */

// {/*<Container style={{flex: 1}}>*/}
// {/*  <View style={{marginBottom: 10, alignItems: 'center'}}>*/}
// {/*    <Text style={{fontSize: 30, fontFamily: 'NotoKufiArabic-Bold'}}>*/}
// {/*      إضافة شحنة جديدة*/}
// {/*    </Text>*/}
// {/*  </View>*/}
// {/*  {!this.state.isLoading ? (*/}
// {/*    <View style={{flex: 1, margin: 10}}>*/}
// {/*      */}
// {/*    </View>*/}
// {/*  ) : (*/}
// {/*    <Indicator transparent={true} cardHeaderName="" />*/}
// {/*  )}*/}
// {/*</Container>;*/}
