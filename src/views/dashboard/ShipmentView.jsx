import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Col} from 'react-native-easy-grid';
import {ArabicNumbers} from 'react-native-arabic-numbers';
import {Card, CardItem} from 'native-base';
import {Chart} from '../../components';

export default class ShipmentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{x: ' ', y: 10}, {x: ' ', y: 25}],
      rejected: 5,
    };
  }

  render() {
    const {data, rejected} = this.state;
    return (
      <Card
        style={{
          borderRadius: 8,
          marginLeft: 15,
          marginBottom: 10,
          marginTop: 10,
          marginRight: 15,
          elevation: 6,
        }}>
        <CardItem header>
          <Col />
          <Col />
          <Col>
            <Text
              style={{
                fontSize: 25,
              }}>
              الشحنات
            </Text>
          </Col>
        </CardItem>
        <CardItem>
          <Col />
          <Col style={{alignItems: 'center'}}>
            <Chart data={data} colors={['#000000', '#f32323']} />
          </Col>
          <Col />
        </CardItem>
        <CardItem>
          <Col>
            <Text>{ArabicNumbers(rejected)}</Text>
          </Col>
          <Col>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: '#c6f1d6',
                alignSelf: 'center',
              }}
            />
          </Col>
          <Col>
            <Text>المرفوضة</Text>
          </Col>
        </CardItem>
      </Card>
    );
  }
}

// {/*<Row>*/}
// {/*  <CardItem>*/}
// {/*    <Left style={{ flex: 1 }}>*/}
// {/*      <Text style={{ fontFamily: "NotoKufiArabic-Bold" }}>*/}
// {/*        {ArabicNumbers(this.state.total)}*/}
// {/*      </Text>*/}
// {/*    </Left>*/}
// {/*    <Content />*/}
// {/*    <Right style={{ flex: 1 }}>*/}
// {/*      <Text*/}
// {/*        style={{*/}
// {/*          fontFamily: "NotoKufiArabic-Bold"*/}
// {/*        }}*/}
// {/*      >*/}
// {/*        المرسلة*/}
// {/*      </Text>*/}
// {/*    </Right>*/}
// {/*  </CardItem>*/}
// {/*</Row>*/}
// {/*<Row>*/}
// {/*<CardItem>*/}
// {/*<Left style={{ flex: 1 }}>*/}
// {/*<Text style={{ fontFamily: "NotoKufiArabic-Regular" }}>*/}
// {/*{ArabicNumbers(this.state.in_transit)}*/}
// {/*</Text>*/}
// {/*</Left>*/}
// {/*<Content style={{ flex: 1 }}>*/}
// {/*<View*/}
// {/*style={{*/}
// {/*width: 10,*/}
// {/*height: 10,*/}
// {/*borderRadius: 5,*/}
// {/*backgroundColor: "#ff8080",*/}
// {/*alignSelf: "center"*/}
// {/*}}*/}
// {/*/>*/}
// {/*</Content>*/}
// {/*<Right style={{ flex: 1 }}>*/}
// {/*<Text style={{ fontFamily: "NotoKufiArabic-Regular" }}>*/}
// {/*في الطريق*/}
// {/*</Text>*/}
// {/*</Right>*/}
// {/*</CardItem>*/}
// {/*</Row>*/}
// {/*<Row>*/}
// {/*<CardItem>*/}
// {/*<Left style={{ flex: 1 }}>*/}
// {/*<Text style={{ fontFamily: "NotoKufiArabic-Regular" }}>*/}
// {/*{ArabicNumbers(this.state.approved)}*/}
// {/*</Text>*/}
// {/*</Left>*/}
// {/*<Content style={{ flex: 1 }}>*/}
// {/*<View*/}
// {/*style={{*/}
// {/*width: 10,*/}
// {/*height: 10,*/}
// {/*borderRadius: 5,*/}
// {/*backgroundColor: "#ffba92",*/}
// {/*alignSelf: "center"*/}
// {/*}}*/}
// {/*/>*/}
// {/*</Content>*/}
// {/*<Right style={{ flex: 1 }}>*/}
// {/*<Text style={{ fontFamily: "NotoKufiArabic-Regular" }}>*/}
// {/*المستلمة*/}
// {/*</Text>*/}
// {/*</Right>*/}
// {/*</CardItem>*/}
// {/*</Row>*/}
