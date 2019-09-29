import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {Card, CardItem} from 'native-base';
import {Col} from 'react-native-easy-grid';
import {StyleSheet, Text, View} from 'react-native';
import {ArabicNumbers} from 'react-native-arabic-numbers';

import {generator} from '../../utils';
import {Chart} from '../index';

export class ShipmentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      in_transit: 0,
      approved: 0,
      rejected: 0,
      data: [],
    };
    this.setState({
      total: props.shipmentCardData.total_shipments,
      in_transit: props.shipmentCardData.total_shipments_in_transit,
      approved: props.shipmentCardData.total_shipments_shipped,
      rejected: props.shipmentCardData.total_shipments_rejected,

      data: [
        {x: ' ', y: props.shipmentCardData.total_shipments_in_transit},
        {x: ' ', y: props.shipmentCardData.total_shipments_shipped},
        {x: ' ', y: props.shipmentCardData.total_shipments_rejected},
      ],
    });
  }

  render() {
    const {total, in_transit, approved, rejected, data} = this.state;
    return (
      <Card style={styles.card}>
        <CardItem header>
          <Col size={33}>
            <Text style={styles.headerText}>الشحنات</Text>
          </Col>
        </CardItem>

        <CardItem>
          <Col />
          <Col style={styles.colChartView} pointer>
            <Chart data={data} colors={generator(data.length - 1)} />
          </Col>
          <Col />
        </CardItem>

        <CardItem>
          <Col style={styles.colView}>
            <Text style={styles.text}>{ArabicNumbers(total.toString())}</Text>
          </Col>
          <Col />
          <Col style={styles.colView}>
            <Text style={styles.text}>المرسلة</Text>
          </Col>
        </CardItem>

        <CardItem>
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

        <CardItem>
          <Col style={styles.colView}>
            <Text style={styles.text}>
              {ArabicNumbers(approved.toString())}
            </Text>
          </Col>
          <Col style={styles.colView}>
            <View style={styles.recBall} />
          </Col>
          <Col style={styles.colView}>
            <Text style={styles.text}>المستلمة</Text>
          </Col>
        </CardItem>

        <CardItem>
          <Col>
            <Text style={styles.text}>
              {ArabicNumbers(rejected.toString())}
            </Text>
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
  }
}

ShipmentCard.propTypes = {
  shipmentCardData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number))
    .isRequired,
};

const styles = StyleSheet.create({
  card: {
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
  },
});
