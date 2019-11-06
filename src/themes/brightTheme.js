import {DefaultTheme} from 'react-native-paper';

const fontConfig = {
	...DefaultTheme.fonts,
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
};

export const BrightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#9204cc',
		fonts: fontConfig,
	},
};
