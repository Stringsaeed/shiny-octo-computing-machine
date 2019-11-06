import React, {Component} from 'react';
import {Button, Text, TextInput, Snackbar} from 'react-native-paper';
import {Image, Alert, View, StyleSheet} from 'react-native';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			visible: false,
		};
		this._fetchData = this._fetchData.bind(this);
		this._onPress = this._onPress.bind(this);
	}
	componentDidMount() {
		this.emailTextInput.focus();
	}

	componentDidUpdate(prevProps) {
		if (this.props.success) {
			this.props.navigation.navigate('app');
			this.passwordTextInput.clear();
			this.emailTextInput.clear();
		} else if (this.props.errorMessage !== prevProps.errorMessage) {
			this.setState(state => {
				return {visible: true};
			});
			this.passwordTextInput.clear();
			this.emailTextInput.focus();
		}
	}

	_fetchData() {
		this.props.loginRequest(this.state.email, this.state.password);
	}

	_onPress = () => this._fetchData();

	render() {
		const {emailError, passwordError, screenProps, errorMessage} = this.props;
		const {t} = screenProps;
		const {email, password, visible} = this.state;
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('~/assets/logo.png')} />
				<View style={styles.inputContainer}>
					<TextInput
						ref={input => {
							this.emailTextInput = input;
						}}
						onSubmitEditing={() => {
							this.passwordTextInput.focus();
						}}
						blurOnSubmit={false}
						error={emailError}
						value={email}
						style={styles.inputs}
						label={t('login.email')}
						mode="outlined"
						returnKeyType="next"
						keyboardType="email-address"
						underlineColor="#9204cc"
						onChangeText={_email => this.setState({email: _email})}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						ref={input => {
							this.passwordTextInput = input;
						}}
						onSubmitEditing={() => {
							this._onPress();
						}}
						blurOnSubmit={false}
						error={passwordError}
						value={password}
						style={styles.inputs}
						returnKeyType="go"
						label={t('login.password')}
						mode="outlined"
						secureTextEntry={true}
						underlineColor="#9204cc"
						onChangeText={_password => this.setState({password: _password})}
					/>
				</View>
				<Button
					mode="contained"
					dark
					color="#9204cc"
					loading={this.props.isLoading}
					uppercase={false}
					icon="exit-to-app"
					animated
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={this._onPress}>
					<Text style={styles.loginText}>{t('login.loginBtn')}</Text>
				</Button>
				<Snackbar
					visible={visible}
					onDismiss={() => this.setState({visible: false})}>
					{t(`login.${errorMessage}`)}
				</Snackbar>

				<View style={styles.copyRightView}>
					<Text style={styles.text}>©Copyright @ Crevisoft 2019</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	inputContainer: {
		backgroundColor: '#FFFFFF',
		width: '80%',
		height: 45,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputs: {
		backgroundColor: '#ffffff',
		flex: 1,
	},
	buttonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	loginButton: {
		backgroundColor: '#9204cc',
	},
	loginText: {
		color: '#feeff8',
	},
	text: {
		fontWeight: 'bold',
		fontFamily: 'NotoKufiArabic-Regular',
	},
	logo: {
		width: 200,
		height: 200,
	},
	copyRightView: {
		bottom: 0,
		alignItems: 'center',
		position: 'absolute',
		marginTop: '2%',
	},
});
