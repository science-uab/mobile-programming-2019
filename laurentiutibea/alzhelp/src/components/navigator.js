import React from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./home";
import Map from "./map";
import Login from "./login";
import Account from "./account";
import auth from "../services/authService";
import _ from "lodash";

export default class Navigator extends React.Component{
	state ={
		logged: false,
		admin: false
	};

	login(){
		auth.getCurrentUser().then(res => {
			if(!_.isEmpty(res)) {
				if(res.isAdmin === true) this.setState({admin:true});
			}
		}).catch(err => console.log("ERR!"));
	}

	componentDidMount() {
		this.login();
		console.log("IN NAVIGATOR");
	}

	render(){
		const TabNavigator = createBottomTabNavigator({
			Home, ...(this.state.admin === true ? {Map} : null), Account},
			{
				defaultNavigationOptions: ({ navigation }) => ({
					tabBarIcon: ({ focused, horizontal, tintColor }) => {
						const { routeName } = navigation.state;
						let iconName;
						if (routeName === 'Home') {
							iconName = `ios-home`;
						} if (routeName === 'Login') {
							iconName = `ios-log-in`;
						}
						if (routeName === 'Map') {
							iconName = `md-locate`;
						}
						if (routeName === "Account"){
							iconName = "ios-contact";
						}
						if (routeName === "Register"){
							iconName = "ios-contact";
						}
						return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
					},
				}),
				tabBarOptions: {
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray',
				},
			});

		const TabComponent = createAppContainer(TabNavigator);
		return <TabComponent {...this.props.navigation}/>
	}
}