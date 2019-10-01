import React from 'react';

import PropTypes from 'prop-types';
import {Card, CardItem} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {StyleSheet, Text, View} from 'react-native';
import {ArabicNumbers} from 'react-native-arabic-numbers';

import {Chart} from '../chart';
import {generator} from '../../utils';

export const ShipmentCard = props => {
  const {total, in_transit, approved, rejected, data} = props.shipmentCardData;
  return (
    <Card style={styles.card}>
      <CardItem header>
        <Col size={33}>
          <Text style={styles.headerText}>الشحنات</Text>
        </Col>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Col />
        <Col style={styles.colChartView}>
          {in_transit || approved || rejected ? (
            <Chart data={data} colors={generator(data.length - 1)} />
          ) : (
            <Text>لا توجد شحنات</Text>
          )}
        </Col>
        <Col />
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Col>
          <Text style={styles.text}>{ArabicNumbers(total.toString())}</Text>
        </Col>
        <Col />
        <Col>
          <Text style={styles.text}>المرسلة</Text>
        </Col>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Col style={styles.colView}>
          <Text style={styles.text}>
            {ArabicNumbers(in_transit.toString())}
          </Text>
        </Col>
        <Col style={styles.colView}>
          <View style={styles.inTransitCircle} />
        </Col>
        <Col style={styles.colView}>
          <Text style={styles.text}>في الطريق</Text>
        </Col>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Col style={styles.colView}>
          <Text style={styles.text}>{ArabicNumbers(approved.toString())}</Text>
        </Col>
        <Col style={styles.colView}>
          <View style={styles.recBall} />
        </Col>
        <Col style={styles.colView}>
          <Text style={styles.text}>المستلمة</Text>
        </Col>
      </CardItem>

      <CardItem style={{flex: 1}}>
        <Col>
          <Text style={styles.text}>{ArabicNumbers(rejected.toString())}</Text>
        </Col>
        <Col>
          <View style={styles.cardFooter} />
        </Col>
        <Col>
          <Text>المرفوضة</Text>
        </Col>
      </CardItem>
    </Card>
  );
};

ShipmentCard.propTypes = {
  shipmentCardData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 15,
    elevation: 6,
    flex: 1,
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
