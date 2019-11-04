import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {FilterPortal} from '../filterPortal';
import {Icon, Col} from 'native-base';

export const TopBar = ({onFiltering, filter, filters, name, createButton}) => {
  const [visible, setVisible] = useState(false);
  const [_filter, setFilter] = useState(filter);
  return (
    <View style={styles.view}>
      <Col size={33} style={styles.right}>
        <Text style={styles.textFont}>{name}</Text>
      </Col>
      <Col style={styles.left} size={33}>
        {onFiltering && filters && filter && (
          <Button
            transparent
            onPress={() => {
              setVisible(true);
            }}>
            <Icon
              name="filter-variant"
              type="MaterialCommunityIcons"
              color={'#000000'}
            />
            <FilterPortal
              onFiltering={onFiltering}
              setFilter={setFilter}
              defaultFilter={_filter}
              setVisible={setVisible}
              filters={filters}
              visible={visible}
            />
          </Button>
        )}
        {createButton && (
          <Button
            transparent
            onPress={() => {
              createButton.createView();
            }}>
            <Icon name={createButton.iconName} color={'#000000'} />
          </Button>
        )}
      </Col>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    height: '8%',
    flexDirection: 'row',
    borderColor: '#d3d3d3',
  },
  left: {
    justifyContent: 'flex-end',
    flex: 0,
    flexDirection: 'row',
    // marginRight: '1.2%',
  },
  dialogScrollArea: {
    maxHeight: 170,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
  textFont: {
    fontFamily: 'NotoKufiArabic-Regular',
  },
  right: {
    justifyContent: 'center',
    marginLeft: '1.2%',
  },
});
