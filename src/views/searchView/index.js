import React, {Fragment, useState} from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';

export const SearchView = props => {
  const [value, setValue] = useState('');
  const {data, isSearching, search, onSelect} = props;

  return (
    <Fragment>
      <FlatList
        ListHeaderComponent={
          <SearchBar
            placeholder="Type..."
            value={value}
            showLoading={isSearching}
            onChangeText={text => {
              if (text !== '' && text.length >= 3) {
                search(text);
              }
              setValue(text);
            }}
          />
        }
        keyExtractor={(item, index) => item.id.toString()}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
            style={styles.flexView}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </Fragment>
  );
};

SearchView.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('title', 'Search'),
  headerTintColor: '#fff',
  headerBackTitle: null,
  headerForceInset: true,
});

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
});
