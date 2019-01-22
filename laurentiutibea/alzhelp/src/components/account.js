import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StackActions, NavigationActions } from "react-navigation";
import { AsyncStorage } from "react-native";
import Login from "./login";
import t from "tcomb-form-native";
import _ from "lodash";
import auth from "../services/authService";
import info from "../services/infoService";

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

export default class Account extends React.Component {
	state = {
		data: {email: "", password: ""},
		errors: {

		},
		connectedWith: "",
		admin: false
	};

	static navigationOptions = {
		title: "My Account - AlzHelp"
	};

	async login(){
		await auth.getCurrentUser().then(res => {
			if(!_.isEmpty(res)) {
				if(res.isAdmin === true) this.setState({admin:true});
			}
		}).catch(err => console.log("ERR!"));
		await auth.getCurrentConnectedUser().then(res => {
			if(!_.isEmpty(res)) {
				this.setState({connectedWith:res.email})
			}
		}).catch(err => console.log("ERR!"));
	}

	handleSubmit = async () => {
		const data = this._form.getValue();
		if(!_.isEmpty(data)) {this.setState({data: data});}
		try{
			await auth.connectedWith(data.email, data.password);
			this.setState({connectedWith:this.state.data.email});
		}
		catch(ex){
			if(ex.response && ex.response.status === 400){
				alert("Invalid data!");
			}
		}
	};

	handleRemoveAccount = async () => {
		AsyncStorage.removeItem("tokenConnected");
		this.setState({connectedWith: "",refresh:false});
		this.componentDidMount();
	};

	async componentDidMount() {
		await this.login();
		console.log(this.state);
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={{width:300,height:250}} source={require("../img/logo.png")}/>
				{this.state.admin === true && this.state.connectedWith === "" && <View style={{alignItems:"center"}}>
					<Form
						ref={c => this._form = c}
						type={User}
						options={options}
					/>
					<TouchableOpacity onPress={this.handleSubmit}>
						<Image style={{width:50,height:50}} source={require("../img/connectUsers.png")}/>
					</TouchableOpacity>
				</View>}
				{this.state.admin === true && this.state.connectedWith !== "" &&
				<View style={{alignItems: "center"}}>
					<Text style={styles.boldTitle2}>YOU ARE CONNECTED WITH</Text>
					<Text style={styles.text}>{this.state.connectedWith}</Text>
					<TouchableOpacity onPress={this.handleRemoveAccount}>
						<Image style={{width:50,height:50}} source={require("../img/removeUser.png")}/>
					</TouchableOpacity>
				</View>
				}
				<Text style={styles.boldTitle2}>LOGOUT</Text>
				<TouchableOpacity onPress={() => {
					AsyncStorage.removeItem("token");
					AsyncStorage.removeItem("tokenConnected");
					this.props.navigation.dispatch(StackActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: "Login" })
						],
					}));
				}}>
					<Image style={{width:50,height:50}} source={require("../img/logout.png")}/>
				</TouchableOpacity>
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
	},
	text: {
		fontSize: 15,
		color: "#333"
	}
});
