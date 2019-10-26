import React, {Fragment, useState} from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';

export const SearchView = props => {
  const [value, setValue] = useState('');
  const actionName = navigation.getParam('actionName', '');

  const {
    isSearching,
    searchProudcts,
    searchUsers,
    searchCategories,
    products,
    users,
    categories,
    onSelect,
    navigation,
  } = props;

  const data =
    actionName === 'products'
      ? products
      : actionName === 'users'
      ? users
      : actionName === 'categories'
      ? categories
      : [];

  return (
    <Fragment>
      <FlatList
        ListHeaderComponent={
          <SearchBar
            placeholder="Type..."
            value={value}
            showLoading={isSearching}
            onChangeText={text => {
              if (text !== '') {
                if (actionName === 'products') {
                  searchProudcts(text);
                } else if (actionName === 'users') {
                  searchUsers(text);
                } else if (actionName === 'catrgory') {
                  searchCategories(text);
                }
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

// export const SearchDialog = ({
//   data,
//   search,
//   isSearching,
//   visible,
//   title,
//   onSelect,
//   searchBar,
// }) => {

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
});
