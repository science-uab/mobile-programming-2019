import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity} from 'react-native';
import { FormInput } from "react-native-elements";
import * as userService from "../services/userService";
import t from "tcomb-form-native";
import _ from "lodash";
import medicine from "../services/medicineService";

const Form = t.form.Form;

const Medicine = t.struct({
	name: t.String
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
			color: "#333",
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
			error: 'Please insert a name!'
		}
	},
	stylesheet: formStyles,
};

export default class addMedicine extends React.Component {
	state = {
		data: [],
		errors: {

		}
	};

	static navigationOptions = {
		title: "Add medicine - AlzHelp"
	};

	handleSubmit = async () => {
		const data = this._form.getValue();
		if(!_.isEmpty(data)) {await this.setState({data: data});}
		try{
			await medicine.addMedicine({name:this.state.data.name,image:"test"});
			alert("Successful added medicine!");
		}
		catch(ex){
			if(ex.response && ex.response.status === 400){
				console.log(ex.response.data);
				if(ex.response.data === "Already in list.") {alert("Medicine already in list."); this.setState({data: ""})}
				else {alert("Please insert valid data");}
			}
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<Image style={{width:300,height:250}} source={require("../img/logo.png")}/>
				<Text style={styles.boldTitle}>ADD NEW MEDICINE</Text>

				<Form
					ref={c => this._form = c}
					type={Medicine}
					options={options}
				/>
				<TouchableOpacity onPress={this.handleSubmit}>
					<Image style={{width:50,height:50}} source={require("../img/done.png")}/>
				</TouchableOpacity>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	boldTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#d90000",
		marginTop: 10
	}
});
