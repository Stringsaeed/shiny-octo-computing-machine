import React, {Fragment} from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import {ArabicNumbers} from 'react-native-arabic-numbers';
import {Card, CardItem, Text, Left, Right, View} from 'native-base';

export const ShipmentItem = ({
  product,
  amount,
  price,
  date,
  state,
  barcode,
}) => {
  let translate_state;

  if (state === 'draft') {
    translate_state = 'في الطريق';
  } else if (state === 'approved') {
    translate_state = 'مستلمة';
  } else if (state === 'rejected') {
    translate_state = 'مرفوضة';
  } else {
    translate_state = 'شحنت';
  }
  Moment.locale('en');

  const formatted_date = Moment(date);
  const year = formatted_date.year();
  const day = formatted_date.date();
  const month = formatted_date.month() + 1;
  console.log('afafsfa');
  return (
    <Fragment>
      <Card>
        <CardItem header style={styles.flex}>
          <Left style={styles.flex}>
            <Text style={styles.textStyle}>{product}</Text>
          </Left>
          <Right style={styles.flex}>
            <Text style={styles.textStyle}>المنتج</Text>
          </Right>
        </CardItem>

        <CardItem style={styles.flex}>
          <Left style={styles.flex}>
            <Barcode value={barcode} format="CODE128" width={1} />
          </Left>
          <Right style={styles.colView}>
            <View style={styles.rowView}>
              <Left style={styles.flex}>
                <Text style={styles.textStyle}>{ArabicNumbers(amount)}</Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>الكمية</Text>
              </Right>
            </View>
            <View style={styles.rowView}>
              <Left style={styles.flex}>
                <Text style={styles.textStyle}>{ArabicNumbers(price)}</Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>التكلفة</Text>
              </Right>
            </View>
            <View style={styles.rowView}>
              <Left style={styles.rowView}>
                <Text style={styles.textStyle}>
                  {ArabicNumbers(year.toString())}/
                </Text>
                <Text style={styles.textStyle}>
                  {ArabicNumbers(month.toString())}/
                </Text>
                <Text style={styles.textStyle}>
                  {ArabicNumbers(day.toString())}
                </Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>التاريخ</Text>
              </Right>
            </View>
            <View style={styles.rowView}>
              <Left style={styles.flex}>
                <Text style={styles.textStyle}>{translate_state}</Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>الحالة</Text>
              </Right>
            </View>
          </Right>
        </CardItem>
      </Card>
    </Fragment>
  );
};

ShipmentItem.propTypes = {
  product: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  barcode: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'right',
    fontFamily: 'NotoKufiArabic-Regular',
  },
  colView: {
    flex: 1,
    flexDirection: 'column',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
});