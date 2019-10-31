import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BallIndicator} from 'react-native-indicators';
import {Card, CardItem} from 'native-base';
import {StyleSheet, RefreshControl, View, FlatList, Text} from 'react-native';

import {filtersPortal} from '../../constants';
import {TopBar, RenderFooter, ShipmentItem} from '../../components';

export class ShipmentView extends Component {
  constructor(props) {
    super(props);
    this.props.fetch('fetch', false, 0);
    this._onRefresh = this._onRefresh.bind(this);
  }

  _onRefresh() {
    this.props.fetch('refresh', this.props.filter, 0);
  }

  render() {
    const {
      isLoading,
      filter,
      navigation,
      isUpdating,
      length,
      limit,
      offset,
      isRefreshing,
      data,
      fetch,
    } = this.props;
    if (!isLoading) {
      return (
        <View style={styles.flex}>
          <TopBar
            filters={filtersPortal}
            filter={filter}
            onFiltering={_filter => {
              fetch('fetch', _filter, 0);
            }}
            name="عرض الشحنات"
            createButton={{
              iconName: 'ios-add-circle-outline',
              createView: () => {
                navigation.navigate('createShipment');
              },
            }}
          />
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ShipmentItem
                product={item.product_id[1]}
                amount={item.quantity}
                date={item.create_date}
                state={item.state}
                price={item.standard_price}
                barcode={item.barcode}
              />
            )}
            keyExtractor={(item, index) => item.id.toString()}
            ListFooterComponent={
              <RenderFooter
                isUpdating={isUpdating}
                len={length}
                limit={limit}
                offset={offset}
                update={key => {
                  const offsetUpdating =
                    key === 'in'
                      ? offset + limit
                      : key === 'de'
                      ? offset - limit
                      : offset;
                  fetch('update', filter, offsetUpdating);
                }}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text>لا يوجد شحنات</Text>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this._onRefresh}
              />
            }
          />
        </View>
      );
    } else {
      return (
        <Card transparent style={styles.indicatorCardView}>
          <CardItem style={styles.flex}>
            <View style={styles.flex}>
              <View style={styles.indicatorView}>
                <BallIndicator color="#540e33" />
              </View>
            </View>
          </CardItem>
        </Card>
      );
    }
  }
}

ShipmentView.propTypes = {
  isLoading: PropTypes.bool,
  filter: PropTypes.string,
  isUpdating: PropTypes.bool,
  length: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  isRefreshing: PropTypes.bool,
  data: PropTypes.array,
  fetch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
    fontFamily: 'NotoKufiArabic-Regular',
  },
  flex: {
    flex: 1,
  },
  indicatorCardView: {
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20,
    marginRight: 15,
  },
  indicatorView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
