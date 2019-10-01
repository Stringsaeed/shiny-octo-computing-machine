import React from 'react';

import PropTypes from 'prop-types';
import {Card, CardItem, Left, Right, Content} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import {ArabicNumbers} from 'react-native-arabic-numbers';

import {Chart} from '../chart';
import {generator} from '../../utils';

export const ShipmentCard = props => {
  const {total, in_transit, approved, rejected, data} = props.shipmentCardData;
  return (
    <Card style={styles.card}>
      <CardItem header>
        <Right>
          <Text style={styles.headerText}>الشحنات</Text>
        </Right>
      </CardItem>

      <CardItem
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {in_transit || approved || rejected ? (
          <Chart data={data} colors={generator(data.length - 1)} />
        ) : (
          <Text>لا توجد شحنات</Text>
        )}
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Left>
          <Text style={styles.text}>{ArabicNumbers(total.toString())}</Text>
        </Left>
        <Content />
        <Right>
          <Text style={styles.text}>المرسلة</Text>
        </Right>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Left style={styles.colView}>
          <Text style={styles.text}>
            {ArabicNumbers(in_transit.toString())}
          </Text>
        </Left>
        <Content style={styles.colView}>
          <View style={styles.inTransitCircle} />
        </Content>
        <Right style={styles.colView}>
          <Text style={styles.text}>في الطريق</Text>
        </Right>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Left style={styles.colView}>
          <Text style={styles.text}>{ArabicNumbers(approved.toString())}</Text>
        </Left>
        <Content style={styles.colView}>
          <View style={styles.recBall} />
        </Content>
        <Right style={styles.colView}>
          <Text style={styles.text}>المستلمة</Text>
        </Right>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Left>
          <Text style={styles.text}>{ArabicNumbers(rejected.toString())}</Text>
        </Left>
        <Content>
          <View style={styles.cardFooter} />
        </Content>
        <Right>
          <Text>المرفوضة</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

ShipmentCard.propTypes = {
  shipmentCardData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 8,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 15,
    elevation: 6,
  },
  headerText: {
    fontSize: 25,
  },
  colChartView: {alignItems: 'center'},
  colView: {flex: 1},
  text: {
    fontFamily: 'NotoKufiArabic-Regular',
  },
  inTransitCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D16BCA',
    alignSelf: 'center',
  },
  recBall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DBB0D8',
    alignSelf: 'center',
  },
  cardFooter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F3CEF0',
    alignSelf: 'center',
    flex: 1,
  },
});
