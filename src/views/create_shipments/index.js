import React, {Component} from 'react';
import {BallIndicator} from 'react-native-indicators';
import Autocomplete from 'react-native-autocomplete-input';
import {Text, View, Left, Right, CardItem} from 'native-base';
import {Button, List, Card, TextInput} from 'react-native-paper';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
//
// import {SearchDialog} from '../../components';
// import {search} from '../../actions';

export class CreateShipment extends Component {
  constructor(props) {
    super(props);
    this.props.fetchData();

    this.state = {
      quantity: 0,
      price: 0,
      selectedProduct: {
        name: '',
        responsible_id: [0, ''],
        standard_price: 0,
      },
      hideFlatList: true,
      product: '',
      validated: false,
      selectedResponsible: {},
      selectedProductResponsible: [],
      productVisible: false,
      responsibleVisible: false,
      autocompleteVisible: false,
      keyboardVisible: false,
    };
    this.isValidated = this.isValidated.bind(this);
    this.textInput = React.createRef();
  }

  _getPrice() {
    const {selectedProduct, quantity} = this.state;
    return selectedProduct.standard_price * quantity;
  }

  showDialog = () => {
    this.setState({visible: true});
  };
  hideDialog = () => {
    this.setState({visible: false});
  };
  isValidated = () => {
    return !!(this.state.selectedProduct.id && this.state.quantity !== 0);
  };

  render() {
    const {
      product,
      productVisible,
      quantity,
      selectedProduct,
      selectedResponsible,
      selectedProductResponsible,
      responsibleVisible,
      validated,
      hideFlatList,
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
      searchRequest,
    } = this.props;

    return !isLoading ? (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
        <Card
          style={{
            flex: 40,
            flexDirection: 'column',
            margin: '5%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <Card.Content style={{flex: 1, flexDirection: 'row'}}>
            <Left style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
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
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Left>
                  <CardItem>
                    <Text>التكلفة</Text>
                  </CardItem>
                </Left>
                <Right>
                  <CardItem>
                    <Text>{this._getPrice()}</Text>
                  </CardItem>
                </Right>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Left>
                  <CardItem>
                    <Text>المسئول</Text>
                  </CardItem>
                </Left>
                <Right>
                  <CardItem>
                    <Text>{selectedProduct.responsible_id[1]}</Text>
                  </CardItem>
                </Right>
              </View>
            </Left>
            <Right>
              <CardItem>
                <Image
                  source={require('~/assets/shipment.gif')}
                  width="25%"
                  height="25%"
                />
              </CardItem>
            </Right>
          </Card.Content>
        </Card>
        {this.isValidated() ? (
          <View style={{flex: 10, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Button
                mode="contained"
                style={{
                  flex: 1,
                  marginHorizontal: '2%',
                  backgroundColor: '#9204cc',
                }}>
                <Text
                  style={{
                    fontFamily: 'NotoKufiArabic',
                    color: '#fff',
                  }}>
                  حفظ
                </Text>
              </Button>
            </View>
            <View style={{flex: 1}}>
              <Button
                mode="contained"
                style={{
                  flex: 1,
                  marginHorizontal: '2%',
                  backgroundColor: '#9204cc',
                }}>
                حفظ وجديد
              </Button>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flex: 50,
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <View style={styles.inputContainer}>
            <Autocomplete
              data={products}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'center'}}
                  onPress={() =>
                    this.setState(state => ({
                      ...state,
                      selectedProduct: {...item},
                    }))
                  }>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              inputContainerStyle={{borderWidth: 0}}
              containerStyle={{borderWidth: 0}}
              listStyle={{
                borderColor: '#9204cc',
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
              hideResults={hideFlatList}
              listContainerStyle={{flex: 1}}
              renderTextInput={props => (
                <TextInput
                  ref={this.textInput}
                  {...props}
                  style={styles.inputs}
                  value={selectedProduct.name || product}
                  label="المنتج"
                  mode="outlined"
                  onFocus={() => this.setState({hideFlatList: false})}
                  onBlur={() => this.setState({hideFlatList: true})}
                  onChangeText={_product => {
                    this.setState({product: _product});
                    this.props.searchRequest(
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
              )}
            />
          </View>
          <View style={{height: 50, ...styles.inputContainer}}>
            <TextInput
              value={quantity.toLocaleString()}
              style={styles.inputs}
              label="الكمية"
              mode="outlined"
              keyboardType="numeric"
              onChangeText={_quantity => {
                if (_quantity) {
                  this.setState({quantity: _quantity});
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
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
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  inputContainer: {
    width: '80%',
    marginBottom: '4%',
    flex: 10,
  },
  inputs: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderColor: '#9204cc',
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
