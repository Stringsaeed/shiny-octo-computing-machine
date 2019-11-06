import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardItem} from 'native-base';
import {BallIndicator} from 'react-native-indicators';
import {StyleSheet, RefreshControl, View, FlatList, Text} from 'react-native';

import {RenderFooter, ProductItem, TopBar} from '../../components';

export class ProductView extends Component {
	constructor(props) {
		super(props);
		this.props.fetch('fetch', 0);
		this._onRefresh = this._onRefresh.bind(this);
	}

	_onRefresh() {
		this.props.fetch('refresh', 0);
	}

	render() {
		const {
			isLoading,
			navigation,
			isUpdating,
			length,
			limit,
			offset,
			isRefreshing,
			data,
			fetch,
		} = this.props;
		if (!isLoading) {
			return (
				<View style={styles.flex}>
					<TopBar
						name="عرض المنتجات"
						createButton={{
							iconName: 'ios-add-circle-outline',
							createView: () => {
								navigation.navigate('CreateProduct');
							},
						}}
					/>
					<FlatList
						data={data}
						renderItem={({item}) => (
							<ProductItem
								name={item.name}
								price={item.standard_price}
								category={item.categ_id[1]}
								removal_time={item.removal_time}
								state={item.portal_state}
								barcode={item.barcode}
							/>
						)}
						keyExtractor={(item, index) => item.id.toString()}
						ListFooterComponent={
							<RenderFooter
								isUpdating={isUpdating}
								len={length}
								limit={limit}
								offset={offset}
								update={key => {
									const offsetUpdating =
										key === 'in'
											? offset + limit
											: key === 'de'
											? offset - limit
											: offset;
									fetch('update', offsetUpdating);
								}}
							/>
						}
						ListEmptyComponent={
							<View style={styles.emptyContainer}>
								<Text>لا يوجد منتجات</Text>
							</View>
						}
						refreshControl={
							<RefreshControl
								refreshing={isRefreshing}
								onRefresh={this._onRefresh}
							/>
						}
					/>
				</View>
			);
		} else {
			return (
				<Card transparent style={styles.indicatorCardView}>
					<CardItem style={styles.flex}>
						<View style={styles.flex}>
							<View style={styles.indicatorView}>
								<BallIndicator color="#540e33" />
							</View>
						</View>
					</CardItem>
				</Card>
			);
		}
	}
}

ProductView.propTypes = {
	isLoading: PropTypes.bool,
	isUpdating: PropTypes.bool,
	length: PropTypes.number,
	limit: PropTypes.number,
	offset: PropTypes.number,
	isRefreshing: PropTypes.bool,
	data: PropTypes.array,
	fetch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	text: {
		paddingLeft: 8,
		fontFamily: 'NotoKufiArabic-Regular',
	},
	flex: {
		flex: 1,
	},
	indicatorCardView: {
		marginLeft: 15,
		marginBottom: 10,
		marginTop: 20,
		marginRight: 15,
	},
	indicatorView: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
