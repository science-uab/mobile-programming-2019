import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { FormInput } from "react-native-elements";
import { Permissions, Notifications } from "expo";
import {createAppContainer, createStackNavigator, NavigationActions, StackActions} from "react-navigation";
import auth from "../services/authService";
import * as userService from "../services/userService";
import t from "tcomb-form-native";
import _ from "lodash";
import infoService from "../services/infoService";

const Form = t.form.Form;

const User = t.struct({
	name: t.String,
	email: t.String,
	password: t.String,
	isAdmin: t.Boolean
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
		name: {
			error: 'Please insert your name!'
		},
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
		data: {name: "", email: "", password: "", isAdmin: ""},
		errors: {

		}
	};

	static navigationOptions = {
		title: "Register"
	};

	handleSubmit = async () => {
		const data = this._form.getValue();
		if(!_.isEmpty(data)) {await this.setState({data: data});}
		try{
			await userService.register(this.state.data);
			console.log(this.state.info , this.state.data.email);
			await infoService.registerInfo({email:this.state.data.email, locationInfo:"undefined", pushToken:"undefined"});
			alert("Successful created account!");
		}
		catch(ex){
			if(ex.response && ex.response.status === 400){
				console.log(ex.response.data);
				if(ex.response.data === "User already registered.") {alert("User already registered."); this.setState({data: ""})}
				else {alert("Please insert valid data");}
			}
		}
	};
	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={{flex:1,alignItems:"center"}}>
					<Image style={{width:300,height:250}} source={require("../img/logo.png")}/>
					<Text style={styles.boldTitle2}>REGISTER</Text>
					<Form
						ref={c => this._form = c}
						type={User}
						options={options}
					/>
					<TouchableOpacity onPress={this.handleSubmit} style={{marginBottom: 20}}>
						<Image style={{width:50,height:50}} source={require("../img/done.png")}/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	boldTitle2: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#d90000"
	}
});
