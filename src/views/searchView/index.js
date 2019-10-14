import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';

export const SearchScreen = props => {
  const {data, search} = props;
  const [value, setValue] = useState('');

  return (
    <Fragment>
      <SearchBar
        placeholder="Type..."
        value={value}
        onChangeText={text => {
          if (text !== '') {
            search(text);
          }
          setValue(text);
        }}
      />
      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={data.items}
        renderItem={({item}) => <Text>{item.login}</Text>}
      />
    </Fragment>
  );
};
