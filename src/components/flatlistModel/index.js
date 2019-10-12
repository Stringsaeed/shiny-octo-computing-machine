import React, {Fragment} from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

export const FlatListModel = ({getMoreData, data, onSelect}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={item => {
          console.log(item);
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item.id);
              }}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        onEndReached={getMoreData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '2%',
  },
  text: {
    fontFamily: 'NotoKufiArabic-Regular',
  },
});
