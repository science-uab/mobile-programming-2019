import React from 'react';
import {
	AsyncStorage,
	Button,
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	TimePickerAndroid,
	Image,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import {Permissions, Notifications, Location} from "expo";
import {Avatar, List, ListItem} from "react-native-elements";
import _ from "lodash";
import auth from "../services/authService";
import info from "../services/infoService";
import medicine from "../services/medicineService";

export default class Map extends React.Component {
	state = {
		connectedWith: "",
		pushToken: "",
		data: [],
		done: false,
		timePick: {
			hour: 0,
			minute: 0
		}
	};
	static navigationOptions = {
		title: "Medicines - AlzHelp"
	};

	async componentDidMount() {
		await this.loggedWith();
		await this.getMeds();
	}

	async loggedWith(){
		AsyncStorage.getItem("tokenConnected").then(res => {if(_.isEmpty(res)) this.setState({connectedWith: ""})});
		await auth.getCurrentConnectedUser().then(res => {
			if(!_.isEmpty(res)) {
				this.setState({connectedWith:res.email})
			}
		}).catch(err => console.log("ERR!"));

		await info.getInfo(this.state.connectedWith).then(res => {
			if(!_.isEmpty(res)) {
				this.setState({pushToken:res.pushToken})
			}
		}).catch(err => console.log("ERR!"));
	}

	async getMeds(){
		await medicine.getMedicines().then(res => {
			this.setState({data:res.data})
		}).catch(err => console.log("ERR!"));
	}

	handleRefresh = async () => {
		await medicine.getMedicines().then(res => {
			if(!_.isEmpty(res)) {
				this.setState({data:res.data})
			}
		}).catch(err => console.log("ERR!"));
		this.componentDidMount();
	};

	handleTimePick = async () => {
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
				hour:0,
				minute:0
			});
			this.setState({timePick:{hour:hour,minute:minute}})
		} catch ({code, message}) {
			console.log('Cannot open time picker', message);
		}};

	sendPushNotification(token, title , body) {
		return fetch('https://exp.host/--/api/v2/push/send', {
			body: JSON.stringify({
				to: token,
				title: title,
				body: body,
				data: { message: `${title}${body}` },
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				{!_.isEmpty(this.state.data) ?
					<FlatList
						data={[this.state.data]}
						renderItem={({item}) => (
							item.map(item => {
								return(
									<View key={item._id}>
									<View style={{width:"100%",flex:1,flexDirection: "row",marginTop: 5}}>
										<View style={{width:"55%",flex:1,flexDirection: "row"}}>
											<View><Image style={{width:40, height:40}} source={require("../img/pill.png")}/></View>
											<View style={{justifyContent: "center",marginLeft:10}}><Text style={styles.boldTitle}>{item.name}</Text></View>
										</View>
										<View style={{width:"15%"}}>
											<TouchableOpacity
												onPress={this.handleTimePick}>
												<Image style={{width:40,height:40}} source={require("../img/clock.png")}/>
											</TouchableOpacity>
										</View>
										<View style={{width:"15%"}}>
											<TouchableOpacity onPress={() => {
												let h = new Date().getHours();
												let m = new Date().getMinutes();
												h=h*3600000;
												m=m*60000;

												let h2 = this.state.timePick.hour;
												let m2 = this.state.timePick.minute;
												h2=h2*3600000;
												m2=m2*60000;

												let time = h+m;
												let time2 = h2+m2;

												let total=0;
												if(time2>time) total=time2-time;
												else total=time2;

												console.log(total);

												//setTimeout(()=>{this.sendPushNotification(this.state.pushToken,"Is time to take your medicine!",item.name)}, total);*/
												this.sendPushNotification(this.state.pushToken," ",item.name);
											}}>
												<Image style={{width:40,height:40}} source={require("../img/bell.png")}/>
											</TouchableOpacity>
										</View>
										<View style={{width:"15%"}}>
											<TouchableOpacity onPress={() => {
												medicine.deleteMedicine(item._id);
												this.handleRefresh();
											}}>
												<Image style={{width:40,height:40}} source={require("../img/delete.png")}/>
											</TouchableOpacity>
										</View>
									</View>
										<View style={{height:1, width: "100%", backgroundColor: "#333", marginTop: 3, marginBottom: 3}}/>
									</View>)
							})
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				: <Text>Waiting...</Text>}
				<View style={{flex:1,flexDirection: "row",justifyContent: "space-around"}}>
					<View>
						<TouchableOpacity  onPress={() => {
							this.props.navigation.navigate("AddMedicine");
						}}>
							<Image style={{width:50,height:50}} source={require("../img/add.png")}/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity onPress={this.handleRefresh}>
							<Image style={{width:50,height:50}} source={require("../img/refresh.png")}/>
						</TouchableOpacity>
					</View>
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
	boldTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#d90000"
	}
});