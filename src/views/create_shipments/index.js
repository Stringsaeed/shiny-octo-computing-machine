import React, {Component} from 'react';
import {Left, Right, CardItem} from 'native-base';
import {BallIndicator} from 'react-native-indicators';
import {Button, Card, TextInput} from 'react-native-paper';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';

import Styles from './styles';
import {Autocomplete} from '~/components';
// import {SearchDialog} from '../../components';
// import {search} from '../../actions';

export class CreateShipment extends Component {
	constructor(props) {
		super(props);
		this.props.fetchData();

		this.state = {
			quantity: 0,
			selectedProduct: {
				name: '',
				responsible_id: [0, ''],
				standard_price: 0,
			},
			selectedResponsible: {},
			hideFlatList: true,
			product: '',
			user: '',
		};
		this.isValidated = this.isValidated.bind(this);
		this.textInput = React.createRef();
	}

	_getPrice() {
		const {selectedProduct, quantity} = this.state;
		return selectedProduct.standard_price * quantity;
	}

	showDialog = () => {
		this.setState({visible: true});
	};

	hideDialog = () => {
		this.setState({visible: false});
	};

	isValidated = () => {
		return !!(this.state.selectedProduct.id && this.state.quantity !== 0);
	};

	render() {
		const {
			user,
			product,
			quantity,
			selectedProduct,
			selectedResponsible,
		} = this.state;
		const {
			products,
			isLoading,
			isAdmin,
			currentUser,
			users,
			searchRequest,
		} = this.props;

		return !isLoading ? (
			<ScrollView style={Styles.flexRow(1)} keyboardShouldPersistTaps="always">
				<Card style={Styles.cardStyle(40)}>
					<Card.Content style={Styles.flexRow(1)}>
						<Left style={Styles.flexCol(1)}>
							<View style={Styles.flexRow(1)}>
								<Left>
									<CardItem>
										<Text>الكمية</Text>
									</CardItem>
								</Left>
								<Right>
									<CardItem>
										<Text>{quantity}</Text>
									</CardItem>
								</Right>
							</View>
							<View style={Styles.flexRow(1)}>
								<Left>
									<CardItem>
										<Text>التكلفة</Text>
									</CardItem>
								</Left>
								<Right>
									<CardItem>
										<Text>{this._getPrice()}</Text>
									</CardItem>
								</Right>
							</View>
							<View style={Styles.flexRow(1)}>
								<Left>
									<CardItem>
										<Text>المورد</Text>
									</CardItem>
								</Left>
								<Right>
									<CardItem>
										<Text>
											{isAdmin
												? selectedProduct.responsible_id[1]
												: currentUser.name}
										</Text>
									</CardItem>
								</Right>
							</View>
						</Left>
						<Right>
							<CardItem>
								<Image
									source={require('~/assets/shipment.gif')}
									width="25%"
									height="25%"
								/>
							</CardItem>
						</Right>
					</Card.Content>
				</Card>
				{this.isValidated() ? (
					<View style={Styles.onPressView(10)}>
						<View style={Styles.flexRow(1)}>
							<Button mode="contained" style={Styles.createButton}>
								حفظ
							</Button>
						</View>
						<View style={Styles.flexRow(1)}>
							<Button mode="contained" style={Styles.createButton}>
								حفظ وجديد
							</Button>
						</View>
					</View>
				) : null}
				<View style={Styles.cardStyle(50)}>
					<View style={Styles.inputContainer}>
						<Autocomplete
							data={products}
							renderItem={({item}) => (
								<TouchableOpacity
									style={Styles.onPressView(1)}
									onPress={() =>
										this.setState(state => ({
											...state,
											selectedProduct: {...item},
										}))
									}>
									<Text>{item.name}</Text>
								</TouchableOpacity>
							)}
							onChangeText={_product => {
								this.setState({product: _product});
								searchRequest(
									_product,
									isAdmin
										? ['name', 'standard_price', 'responsible_id']
										: ['name', 'standard_price'],
									'product.template',
								);
							}}
							label="المنتج"
							value={selectedProduct.name || product}
						/>
					</View>
					<View style={Styles.inputContainer}>
						<TextInput
							value={quantity.toLocaleString()}
							style={Styles.inputs}
							label="الكمية"
							mode="outlined"
							keyboardType="numeric"
							onChangeText={_quantity => {
								if (_quantity) {
									this.setState({quantity: _quantity});
								}
							}}
						/>
					</View>
				</View>
				{isAdmin && (
					<View style={Styles.inputContainer}>
						<Autocomplete
							data={users}
							renderItem={({item}) => (
								<TouchableOpacity
									style={Styles.onPressView(1)}
									onPress={() =>
										this.setState(state => ({
											...state,
											selectedResponsible: {...item},
										}))
									}>
									<Text>{item.name}</Text>
								</TouchableOpacity>
							)}
							onChangeText={_user => {
								this.setState({user: _user});
								searchRequest(_user, ['name', 'id'], 'res.users');
							}}
							label="المورد"
							value={selectedResponsible.name || user}
						/>
					</View>
				)}
			</ScrollView>
		) : (
			<View style={Styles.centered}>
				<BallIndicator />
			</View>
		);
	}
}
