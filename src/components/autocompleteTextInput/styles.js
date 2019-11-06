import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	noBorder: {
		borderWidth: 0,
	},
	list: {
		borderColor: '#9204cc',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
	},
	flexRow: flexSize => ({
		flex: flexSize,
	}),
	textInput: {
		flex: 1,
		backgroundColor: '#ffffff',
		borderColor: '#9204cc',
	},
});
