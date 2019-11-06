import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {Left, Content, Right} from 'native-base';

export const RenderFooter = ({isUpdating, offset, limit, len, update}) => {
	if (!isUpdating) {
		return (
			<View style={styles.container}>
				{offset + limit > len || limit === len ? (
					<Left />
				) : (
					<Left>
						<Button
							transparent
							style={styles.button}
							onPress={() => {
								update('in');
							}}>
							<Text style={styles.buttonText}>التالي</Text>
						</Button>
					</Left>
				)}
				<Content />
				{offset === 0 ? (
					<Right />
				) : (
					<Right>
						<Button
							transparent
							style={styles.button}
							onPress={() => {
								update('de');
							}}>
							<Text style={styles.buttonText}>السابق</Text>
						</Button>
					</Right>
				)}
			</View>
		);
	} else {
		return (
			<View style={styles.indicator}>
				<BallIndicator size={35} />
			</View>
		);
	}
};

RenderFooter.propTypes = {
	isUpdating: PropTypes.bool.isRequired,
	offset: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired,
	len: PropTypes.number.isRequired,
	update: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	buttonText: {
		textAlign: 'right',
		color: '#ff8080',
		fontFamily: 'NotoKufiArabic-Bold',
	},
	indicator: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingBottom: 10,
	},
	button: {
		justifyContent: 'center',
	},
});
