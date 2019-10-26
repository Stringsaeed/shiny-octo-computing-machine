import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import {Card, CardItem, Text, Left, Right, View} from 'native-base';

export const ProductItem = ({
  name,
  price,
  category,
  removal_time,
  state,
  barcode,
}) => {
  let translate_state;

  if (state === 'draft') {
    translate_state = 'في المخزن';
  } else if (state === 'approved') {
    translate_state = 'مستلمة';
  } else {
    translate_state = 'مرفوضة';
  }

  return (
    <Fragment>
      <Card>
        <CardItem header style={styles.flex}>
          <Left style={styles.flex}>
            <Text style={styles.textStyle}>{name}</Text>
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
                <Text style={styles.textStyle}>{price}</Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>سعر البيع</Text>
              </Right>
            </View>
            <View style={styles.rowView}>
              <Left style={styles.flex}>
                <Text style={styles.textStyle}>{category}</Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>الفئة</Text>
              </Right>
            </View>
            <View style={styles.rowView}>
              <Left style={styles.flex}>
                <Text style={styles.textStyle}>{removal_time}</Text>
              </Left>
              <Right style={styles.flex}>
                <Text style={styles.textStyle}>انتهاء الصلاحية</Text>
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

ProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  removal_time: PropTypes.number.isRequired,
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
