import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image, TextInput, AsyncStorage, WebView} from 'react-native';
import {Permissions, Notifications, Location, TaskManager, GestureHandler} from "expo";
import auth from "../services/authService";
import _ from "lodash";
import info from "../services/infoService";
import * as userService from "../services/userService";

/*const LOCATION_TASK_NAME = "background-location-task";
let locationInfoGlobal = "";
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
	if (error) {
		return;
	}
	if (data) {
		const { locations } = data;
		locationInfoGlobal = locations;
		console.log("LOCATIILE: ",locations);
	}
});*/

export default class Home extends React.Component {
	state ={
		logged: false,
		admin: false,
		email: "",
		data: {email: "", password: ""},
		errors: {

		},
		connectedWith: "",
		refresh: false,
		locationInfo: "",
		pushToken: "",

		location: null,
		errorMessage: null,
		mapRegion: null,
		hasLocationPermissions: false,
		locationResult: null,
		marker:
			{
				latitude: 0,
				longitude: 0,
				title: "Title",
				description: "Test"
			},

		notification: []
	};

	static navigationOptions = {
		title: "Home - AlzHelp"
	};

	async login(){
		await auth.getCurrentUser().then(res => {
			if(!_.isEmpty(res)) {
				if(res.isAdmin === true) this.setState({logged:true, admin:true, email:res.email});
				else {this.setState({logged:true, admin:false, email:res.email})}
			}
		}).catch(err => console.log("ERR!"));
		this.setState({refresh:true})
	}

	async loggedWith(){
		AsyncStorage.getItem("tokenConnected").then(res => {if(_.isEmpty(res)) this.setState({connectedWith: "", locationInfo: "", pushToken: ""})});
		await auth.getCurrentConnectedUser().then(res => {
			if(!_.isEmpty(res)) {
				this.setState({connectedWith:res.email})
			}
		}).catch(err => console.log("ERR!"));

		await info.getInfo(this.state.connectedWith).then(res => {
			if(!_.isEmpty(res)) {
				this.setState({locationInfo:res.locationInfo, pushToken:res.pushToken})
			}
		}).catch(err => console.log("ERR!"));
	}

	async updateInfos(){
		console.log("UPDATE");
		try {
			await info.updateInfo(this.state.email,this.state.locationInfo,this.state.pushToken);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				console.log(ex.response.data);
			}
		}
	}

	logged(){
		if(this.state.logged === true) return "TRUE";
		else return "FALSE";
	}

	admin(){
		if(this.state.admin === true) return "Admin";
		else return "User";
	}

	handleRefresh = async () => {
		await info.getInfo(this.state.connectedWith).then(res => {
			if(!_.isEmpty(res)) {
				this.setState({locationInfo:res.locationInfo, pushToken:res.pushToken})
			}
		}).catch(err => console.log("ERR!"));
		this.componentDidMount();
	};

	_handleNotification = (notification) => {
		this.setState({notification: notification});
	};

	registerForPushNotifications = async () => {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted'){
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			return;
		}
		let token = await Notifications.getExpoPushTokenAsync();
		console.log(token);
		this.setState({pushToken:token})
	};

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
			});
		} else {
			this.setState({ hasLocationPermissions: true });
		}

		/*await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
			accuracy: Location.Accuracy.Balanced,
			timeInterval: 10000,
		});
		await setTimeout(async () => {
			await this.setState({ locationInfo: JSON.stringify(locationInfoGlobal[0]) });
			console.log(`LOCATION: ${this.state.locationInfo} and PUSH TOKEN: ${this.state.pushToken}`);
			await this.updateInfos();
		},5000);*/

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ locationInfo: JSON.stringify(location) });
	};

	async componentDidMount() {
		await this.login();
		await this.loggedWith();
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
		if(this.state.admin === false) {
			await this.registerForPushNotifications();
			console.log("USER");
			/*setInterval(async () => {
				await this.getLocationAsync();
			}, 15000);*/
			await this.getLocationAsync();
			await this.updateInfos();
		}
		else console.log("ADMIN");
		console.log(`LOCATION: ${this.state.locationInfo} and PUSH TOKEN: ${this.state.pushToken}`);
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{flex:1,alignItems:"center"}}>
					<Image style={{width:300,height:250}} source={require("../img/logo.png")}/>
					<Text style={styles.boldTitle}>WELCOME</Text>
					<Text style={styles.text}>{this.state.email} ({this.admin()})</Text>
					{this.state.connectedWith !== "" &&
					<View style={{alignItems:"center"}}>
						<Text style={styles.boldTitle2}>YOU ARE CONNECTED WITH</Text>
						<Text style={styles.text}>{this.state.connectedWith}</Text>
					</View>
					}
					<View style={{alignItems:"center"}}>
						<TouchableOpacity
							style={{marginTop: 10, marginBottom: 10}}
							onPress={this.handleRefresh}>
							<Image style={{width:50,height:50}} source={require("../img/refresh.png")}/>
						</TouchableOpacity>
					</View>
					{!_.isEmpty(this.state.notification) &&
						<View style={{alignItems: "center"}}>
							<Text style={{fontSize: 18, color:"#333"}}>It's time to take your medicine !</Text>
							<Text style={styles.boldTitle2}>{this.state.notification.data.message}</Text>
						</View>
					}
				</View>
				<View style={{flex:1,flexDirection: "row",justifyContent: "space-around",marginTop: 420}}>
					<View>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Home')}>
							<Image style={{width:50,height:50}} source={require("../img/home.png")}/>
						</TouchableOpacity>
					</View>
					{this.state.admin &&
					<View>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Map')}>
							<Image style={{width:50,height:50}} source={require("../img/location.png")}/>
						</TouchableOpacity>
					</View>
					}
					{this.state.admin &&
						<View>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('Medicine')}>
								<Image style={{width:50,height:50}} source={require("../img/pills.png")}/>
							</TouchableOpacity>
						</View>
					}
					<View>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Account')}>
							<Image style={{width:50,height:50}} source={require("../img/account.png")}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	boldTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#d90000"
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