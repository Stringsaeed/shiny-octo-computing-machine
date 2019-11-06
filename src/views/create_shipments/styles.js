import {StyleSheet} from 'react-native';

const baseStyles = StyleSheet.create({
	flexRow: flexSize => ({
		flex: flexSize,
		flexDirection: 'row',
	}),
	flexCol: flexSize => ({
		flex: flexSize,
		flexDirection: 'column',
	}),
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default StyleSheet.create({
	...baseStyles,
	presenterCardStyle: {
		...baseStyles.flexRow(40),
		margin: '5%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,

		elevation: 9,
	},
	inputsCardStyle: {
		...baseStyles.flexRow(50),
		margin: '5%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,

		elevation: 9,
	},
	onPressView: flexSize => ({
		...baseStyles.flexRow(flexSize),
		alignItems: 'center',
	}),
	createButton: {
		...baseStyles.flexRow(1),
		marginHorizontal: '2%',
		backgroundColor: '#9204cc',
	},
	createButtonText: {
		fontFamily: 'NotoKufiArabic-Regular',
		color: '#fff',
	},
	inputContainer: {
		width: '80%',
		marginBottom: '4%',
		...baseStyles.flexRow(10),
	},
	inputs: {
		flex: 1,
		backgroundColor: '#ffffff',
		borderColor: '#9204cc',
	},
});
