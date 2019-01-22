import React from 'react';
import {AsyncStorage, Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Permissions, Location, MapView, Constants } from "expo";
import _ from "lodash";
import auth from "../services/authService";
import info from "../services/infoService";

export default class Map extends React.Component {
	state = {
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
		connectedWith: "",
		locationInfo: "",
		admin: false

	};
	static navigationOptions = {
		title: "Map - AlzHelp"
	};

	async componentDidMount() {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
			});
		} else {
			await this.loggedWith();
			await this.getLocation();
		}
		console.log(this.state);
	}

	//_handleMapRegionChange = mapRegion => {
		//this.setState({ mapRegion });
	//};

	async loggedWith(){
		AsyncStorage.getItem("tokenConnected").then(res => {if(_.isEmpty(res)) this.setState({connectedWith: "", locationInfo: ""})});
		await auth.getCurrentConnectedUser().then(res => {
			if(!_.isEmpty(res)) {
				console.log(res);
				this.setState({connectedWith:res.email, admin:res.isAdmin})
			}
		}).catch(err => console.log("ERR!"));

		await info.getInfo(this.state.connectedWith).then(res => {
			if(!_.isEmpty(res)) {
				this.setState({locationInfo:res.locationInfo})
			}
		}).catch(err => console.log("ERR!"));
	}

	getLocation = async () => {
		if(this.state.connectedWith !== "" && this.state.admin === false && this.state.locationInfo !== "undefined" && this.state.locationInfo !== "") {
			let {status} = await Permissions.askAsync(Permissions.LOCATION);
			if (status !== 'granted') {
				this.setState({
					locationResult: 'Permission to access location was denied',
				});
			} else {
				this.setState({hasLocationPermissions: true});
			}

			let location = JSON.parse(this.state.locationInfo);
			console.log(location);
			this.setState({
				mapRegion: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				},
				marker: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					title: "Location",
					description: "Location of the user"
				},
				locationResult: location
			});
			console.log(this.state);
		}
	};

	handleRefresh = async () => {
		await info.getInfo(this.state.connectedWith).then(res => {
			if(!_.isEmpty(res)) {
				this.setState({locationInfo:res.locationInfo})
			}
		}).catch(err => console.log("ERR!"));
		this.componentDidMount();
	};

	render() {
		return (
			<View>
				{this.state.connectedWith !== "" &&
				<View style={{alignItems: "center", marginTop: 10}}>
					<Text style={styles.boldTitle2}>YOU ARE CONNECTED WITH</Text>
					<Text style={styles.text}>{this.state.connectedWith}</Text>
					<Text style={styles.boldTitle2}>HIS LOCATION</Text>
				</View>
				}
				{
				this.state.locationResult === null ?
						<Text>Finding current location... Please check if you are connected with an user!</Text> :
							this.state.mapRegion === null ?
								<Text>Map region doesn't exist. Please connect with an user!</Text> :
								<MapView
									style={{ alignSelf: 'stretch', height: 400 }}
									region={this.state.mapRegion}
									//onRegionChange={this._handleMapRegionChange}
								>
									<MapView.Marker
										coordinate={
											{
												latitude:this.state.marker.latitude,
												longitude:this.state.marker.longitude
											}
										}
										title={this.state.marker.title}
										description={this.state.marker.description}
										/>
								</MapView>
				}
				<View style={{alignItems:"center"}}>
					<TouchableOpacity
						style={{marginTop: 10, marginBottom: 10}}
						onPress={this.handleRefresh}>
						<Image style={{width:50,height:50}} source={require("../img/refresh.png")}/>
					</TouchableOpacity>
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