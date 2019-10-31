import React, {Component} from 'react';
import {BallIndicator} from 'react-native-indicators';
import {Button, List, Card, TextInput} from 'react-native-paper';
import {Text, View, Left, Right, CardItem} from 'native-base';
import {
  Image,
  Keyboard,
  Platform,
  UIManager,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  KeyboardAvoidingView,
} from 'react-native';

import {SearchDialog} from '../../components';

export class CreateShipment extends Component {
  constructor(props) {
    super(props);
    this.props.fetch();
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      quantity: 0,
      price: 0,
      selectedProduct: {
        name: '',
        price: 0,
        responsibleId: 0,
        responsibleName: '',
      },
      product: '',
      validated: false,
      selectedResponsible: {},
      selectedProductResponsible: [],
      productVisible: false,
      responsibleVisible: false,
      autocompleteVisible: false,
      keyboardVisible: false,
    };
  }

  componentDidMount() {
    let onShowListenerType =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    let onHideListenerType =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    this.keyboardWillShowListener = Keyboard.addListener(
      onShowListenerType,
      this.onKeyboardWillShow,
    );
    this.keyboardDismissListener = Keyboard.addListener(
      onHideListenerType,
      this.onKeyboardDismiss,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
  }

  onKeyboardWillShow = e => {
    LayoutAnimation.linear();
    this.setState({keyboardVisible: true, autocompleteVisible: true});
  };

  onKeyboardDismiss = e => {
    LayoutAnimation.linear();
    this.setState({keyboardVisible: false, autocompleteVisible: false});
  };
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
      product,
      productVisible,
      quantity,
      selectedResponsible,
      selectedProductResponsible,
      responsibleVisible,
      validated,
    } = this.state;
    const {
      products,
      isLoading,
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
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={{flex: 1}}>
          <Card
            style={{
              flex: 40,
              flexDirection: 'row',
              backgroundColor: '#eaeaea',
              margin: '2.5%',
            }}>
            <Left style={{flex: 1, flexDirection: 'row'}}>
              <Left>
                <CardItem>
                  <Text>الكمية</Text>
                </CardItem>
              </Left>
              <Right>
                <CardItem>
                  <Text>{quantity}</Text>
                </CardItem>
              </Right>
            </Left>
            <Right>
              <CardItem style={{backgroundColor: '#eaeaea'}}>
                <Image
                  source={require('~/assets/shipment.gif')}
                  resizeMethod="auto"
                />
              </CardItem>
            </Right>
          </Card>
          {validated ? (
            <View
              style={{flex: 10, flexDirection: 'row', alignItems: 'center'}}>
              <Left style={{flex: 1}}>
                <Button>حفظ</Button>
              </Left>
              <Right style={{flex: 1}}>
                <Button>حفظ وجديد</Button>
              </Right>
            </View>
          ) : null}
          {/*<View style={{flex: 10, flexDirection: 'row', alignItems: 'center'}}>*/}
          {/*  <Left style={{flex: 1, alignItems: 'center'}}>*/}
          {/*    <Button mode="contained" dark color="#9204cc">*/}
          {/*      اختار منتج*/}
          {/*    </Button>*/}
          {/*  </Left>*/}
          {/*  {isAdmin && (*/}
          {/*    <Right style={{flex: 1, alignItems: 'center'}}>*/}
          {/*      <Button mode="contained" dark color="#9204cc">*/}
          {/*        اختار مورد*/}
          {/*      </Button>*/}
          {/*    </Right>*/}
          {/*  )}*/}
          {/*</View>*/}
          <View
            style={{flex: 50, flexDirection: 'column', alignItems: 'center'}}>
            <View style={styles.inputContainer}>
              <TextInput
                value={product}
                style={styles.inputs}
                label="المنتج"
                mode="outlined"
                onChangeText={_product => {
                  this.setState({product: _product});
                  searchProductsAction(
                    _product,
                    [
                      'name',
                      'standard_price',
                      'categ_id',
                      'removal_time',
                      'portal_state',
                      'barcode',
                      'responsible_id',
                    ],
                    'product.template',
                  );
                }}
              />
              {searchProducts && (
                <View>
                  <ScrollView style={styles.autocompleteList}>
                    {searchProducts.map(item => (
                      <List.Item title={item.name} />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={quantity.toString()}
                style={styles.inputs}
                label="الكمية"
                mode="outlined"
                onChangeText={_quantity => this.setState({quantity: _quantity})}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.indicator}>
        <BallIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWithLabel: {
    flex: 1,
    flexDirection: 'row',
  },
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
  inputContainer: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 45,
    marginBottom: 20,
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  autocompleteList: {
    height: 100,
  },
  keyboardContentContainer: {
    paddingBottom: 150,
  },
  noKeyboardContentContainer: {
    paddingBottom: 0,
  },
});
// {/* <Item inlineLabel rounded style={styles.item}> */}
// {/*<View style={styles.buttonWithLabel}>*/}
// {/*  <Button onPress={() => this.setState({productVisible: true})}>*/}
// {/*    {selectedProduct ? selectedProduct.name : 'اختر منتج'}*/}
// {/*  </Button>*/}
// {/*  <Label style={styles.text(25)}>المنتج</Label>*/}
// {/*</View>*/}
// {/*<SearchDialog*/}
// {/*  data={*/}
// {/*    isAdmin*/}
// {/*      ? products*/}
// {/*      : searchProducts !== []*/}
// {/*      ? searchProducts*/}
// {/*      : products*/}
// {/*  }*/}
// {/*  search={term => {*/}
// {/*    searchProductsAction(term);*/}
// {/*  }}*/}
// {/*  searchBar={isAdmin}*/}
// {/*  isSearching={isSearchingProducts}*/}
// {/*  visible={productVisible}*/}
// {/*  title="اختر منتج"*/}
// {/*  onSelect={_product => {*/}
// {/*    this.setState({*/}
// {/*      selectedProduct: _product,*/}
// {/*      selectedProductResponsible: _product.responsible_id[1],*/}
// {/*      productVisible: false,*/}
// {/*    });*/}
// {/*  }}*/}
// {/*/>*/}
// {/*<Item inlineLabel rounded style={styles.item}>*/}
// {/*  <Input*/}
// {/*    keyboardType="numeric"*/}
// {/*    value={String(quantity)}*/}
// {/*    style={styles.centerTextInput}*/}
// {/*    onChangeText={_quantity => {*/}
// {/*      this.setState({quantity: _quantity});*/}
// {/*    }}*/}
// {/*  />*/}
// {/*  <Label style={styles.text(25)}>الكمية</Label>*/}
// {/*</Item>*/}
// {/*<Item inlineLabel rounded style={styles.item}>*/}
// {/*  <Input disabled style={styles.centerTextInput}>*/}
// {/*    <Text style={styles.text(25)}>{this._getPrice() || 0}</Text>*/}
// {/*  </Input>*/}
// {/*  <Label style={styles.text(25)}>التكلفة</Label>*/}
// {/*</Item>*/}
// {/*<Item inlineLabel rounded disabled={!isAdmin} style={styles.item}>*/}
// {/*  {!isAdmin ? (*/}
// {/*    <Input disabled={!isAdmin} style={styles.centerTextInput}>*/}
// {/*      <Text style={styles.text(25)}>{currentUser.display_name}</Text>*/}
// {/*    </Input>*/}
// {/*  ) : (*/}
// {/*    <Button onPress={() => this.setState({visible: true})}>*/}
// {/*      {selectedResponsible*/}
// {/*        ? selectedResponsible.name*/}
// {/*        : selectedProductResponsible*/}
// {/*        ? selectedProductResponsible[1]*/}
// {/*        : 'اختر مورد'}*/}
// {/*    </Button>*/}
// {/*  )}*/}
// {/*  <SearchDialog*/}
// {/*    data={searchUsers || users}*/}
// {/*    search={term => {*/}
// {/*      searchUsersAction(term);*/}
// {/*    }}*/}
// {/*    isSearching={isSearchingUsers}*/}
// {/*    visible={responsibleVisible}*/}
// {/*    title="اختر مورد"*/}
// {/*    onSelect={_responsible => {*/}
// {/*      this.setState({*/}
// {/*        selectedResponsible: _responsible,*/}
// {/*        responsibleVisible: false,*/}
// {/*      });*/}
// {/*    }}*/}
// {/*  />*/}
// {/*  <Label style={styles.text(25)}>المورد</Label>*/}
// {/*</Item>*/}
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
