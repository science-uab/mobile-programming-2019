import http from "./httpService";
import {apiUrl} from "../../config.json";
import jwtDecode from "jwt-decode";
import { AsyncStorage } from "react-native";

const apiEndpoit = apiUrl + "/infos";
const tokenKey = "token";
const tokenKeyConnected = "tokenConnected";
const tokenKeyInfo = "tokenInfo";

http.setJwt(getJwt());

export async function getInfo(email){
	const {data} = await http.get(apiEndpoit+"/"+email);
	return data;
}

export async function getCurrentInfo(){
	try{
		let jwt = "";
		await AsyncStorage.getItem("tokenInfo").then(res => {console.log(res);jwt = res}).catch((err) => {console.log("ERROR",err)});
		return jwtDecode(jwt);
	}
	catch(ex){
		return null;
	}
}

export function getJwt(){
	return AsyncStorage.getItem(tokenKeyInfo);
}

export function registerInfo(info){
	console.log(info);
	return http.post(apiEndpoit, {
		email: info.email,
		locationInfo: info.locationInfo,
		pushToken: info.pushToken
	});
}

export function updateInfo(email,locationInfo,pushToken){
	console.log("IN UPDATE",email,locationInfo,pushToken);
	return http.put(apiEndpoit+"/"+email, {
		email: email,
		locationInfo: locationInfo,
		pushToken: pushToken
	});
}

export default{
	getInfo,
	getCurrentInfo,
	registerInfo,
	updateInfo
}
