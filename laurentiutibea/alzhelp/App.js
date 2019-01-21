import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer} from "react-navigation";
import Map from "./src/components/map";
import Login from "./src/components/login";
import Register from "./src/components/register";
import Home from "./src/components/home";
import Account from "./src/components/account";
import Medicine from "./src/components/medicine";
import AddMedicine from "./src/components/addMedicine";
import {Location, TaskManager} from "expo";

const AppNavigator = createStackNavigator({
		Account: Account,
		Home:Home,
		Map:Map,
		Login: Login,
		Register: Register,
		Medicine: Medicine,
		AddMedicine: AddMedicine
	},
	{
		initialRouteName: "Login",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#04aed9',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
				textAlign: 'center',
				alignSelf:'center'
			},
		},
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return <AppContainer/>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
