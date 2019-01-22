import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity} from 'react-native';
import { FormInput } from "react-native-elements";
import { Permissions, Notifications } from "expo";
import {createAppContainer, createStackNavigator, NavigationActions, StackActions} from "react-navigation";
import auth from "../services/authService";
import t from "tcomb-form-native";
import _ from "lodash";

const Form = t.form.Form;

const User = t.struct({
	email: t.String,
	password: t.String,
});

const formStyles = {
	...Form.stylesheet,
	formGroup: {
		normal: {
			marginBottom: 10,
			width: 250
		},
	},
	controlLabel: {
		normal: {
			color: '#333',
			fontSize: 18,
			marginBottom: 7,
			fontWeight: 'bold',
			textAlign: "center"
		},
		error: {
			color: 'red',
			fontSize: 18,
			marginBottom: 7,
			fontWeight: 'bold',
			textAlign: "center"
		}
	}
};

const options = {
	fields: {
		email: {
			error: 'Please insert an email!'
		},
		password: {
			password: true,
			secureTextEntry: true,
			error: 'Please insert the password'
		}
	},
	stylesheet: formStyles,
};

export default class Login extends React.Component {
	state = {
		data: {email: "", password: ""},
		errors: {

		}
	};

	static navigationOptions = {
		title: 'Login'
	};

	async login(){
		await auth.getCurrentUser().then(res => {if(!_.isEmpty(res)) {this.setState({logged:true})}}).catch(err => console.log("ERR!"));
	}

	async componentDidMount() {
		await this.login();
		if(this.state.logged === true){
			this.props.navigation.dispatch(StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: "Home" })
				],
			}))
		}
	}

	handleSubmit = async () => {
		const data = this._form.getValue();
		if(!_.isEmpty(data)) {this.setState({data: data});}
		try{
			await auth.login(data.email, data.password);
			this.props.navigation.dispatch(StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: "Home" })
				],
			}));
		}
		catch(ex){
			if(ex.response && ex.response.status === 400){
				alert("Invalid data!");
			}
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<Image style={{width:300,height:250}} source={require("../img/logo.png")}/>
				<Text style={styles.boldTitle2}>LOGIN</Text>
				<View>
					<Form
						ref={c => this._form = c}
						type={User}
						options={options}
					/>
				</View>
				<View style={{flex:1,flexDirection: "row",justifyContent: "space-around"}}>
					<TouchableOpacity
						onPress={this.handleSubmit}
						email={this.state.data.email}>
						<Image style={{width:50,height:50}} source={require("../img/login.png")}/>
					</TouchableOpacity>
					<TouchableOpacity style={{marginLeft:25}}
						onPress={() => {
							this.props.navigation.navigate("Register");
						}}>
						<Image style={{width:50,height:50}} source={require("../img/register.png")}/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	boldTitle2: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#d90000"
	}
});
