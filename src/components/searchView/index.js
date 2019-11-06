import React, {Fragment, useState, useEffect} from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Dialog, {DialogContent, DialogTitle} from 'react-native-popup-dialog';

export const SearchDialog = ({
	data,
	search,
	isSearching,
	visible,
	title,
	onSelect,
	searchBar,
}) => {
	const [_visible, setVisible] = useState(false);
	const [value, setValue] = useState('');

	useEffect(() => {
		if (visible !== _visible) {
			setVisible(visible);
		}
	}, [visible, _visible]);

	console.log(data);
	return (
		<Fragment>
			<Dialog
				height={0.5}
				width={0.8}
				visible={_visible}
				onTouchOutside={() => setVisible(false)}
				dialogTitle={<DialogTitle title={title} />}>
				<DialogContent>
					{searchBar && (
						<SearchBar
							placeholder="Type..."
							value={value}
							showLoading={isSearching}
							onChangeText={text => {
								if (text !== '') {
									search(text);
								}
								setValue(text);
							}}
						/>
					)}
					<FlatList
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
				</DialogContent>
			</Dialog>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	flexView: {
		flex: 1,
		alignItems: 'center',
		margin: 10,
	},
});
