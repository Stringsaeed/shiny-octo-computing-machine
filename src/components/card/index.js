import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Card as NBCard, CardItem, Content, Left, Right} from 'native-base';

import {Chart} from '../chart';

export const DashboardCard = props => {
  const {noChartMessage, chartData, items, headerName} = props;
  const chartBool = _.isEmpty(_.compact(_.map(items, item => item.left)));

  return (
    <NBCard style={styles.card}>
      <CardItem header style={styles.headerItem}>
        <Left>
          <Text style={styles.headerText}>{headerName}</Text>
        </Left>
        <Content />
        <Right />
      </CardItem>

      <CardItem style={styles.chartCardItem} pointerEvents="none">
        {!chartBool ? (
          <Chart data={chartData} />
        ) : (
          <Text>{noChartMessage}</Text>
        )}
      </CardItem>

      {items &&
        items.map(item => (
          <CardItem key={item.key} style={styles.colView}>
            <Left style={styles.colView}>
              <Text style={styles.text}>{item.left.toString()}</Text>
            </Left>
            {item.content ? (
              <Content style={styles.colView}>
                <View style={styles.circle(item.color)} />
              </Content>
            ) : (
              <Content />
            )}
            <Right style={styles.colView}>
              <Text style={styles.text}>{item.right.toString()}</Text>
            </Right>
          </CardItem>
        ))}

      <CardItem footer style={styles.cardFooter} />
    </NBCard>
  );
};

DashboardCard.propTypes = {
  noChartMessage: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object.isRequired),
  headerName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 6,
  },
  chartCardItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
  },
  colChartView: {
    alignItems: 'center',
  },
  colView: {
    flex: 1,
  },
  text: {
    fontFamily: 'NotoKufiArabic-Regular',
  },
  circle: color => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color,
    alignSelf: 'center',
  }),
  headerItem: {
    flex: 1,
    borderRadius: 5,
  },
  cardFooter: {
    borderRadius: 5,
    flex: 1,
  },
});
