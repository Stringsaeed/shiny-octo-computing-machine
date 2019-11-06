import {configureFonts, DefaultTheme} from 'react-native-paper';

const fontConfig = {
	default: {
		bold: {
			fontFamily: 'NotoKufiArabic-Bold',
			fontWeight: 'bold',
		},
		regular: {
			fontFamily: 'NotoKufiArabic-Regular',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'NotoKufiArabic-Regular',
			fontWeight: 'normal',
		},
	},
};

export const DarkTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#9204cc',
		fonts: configureFonts(fontConfig),
	},
};
