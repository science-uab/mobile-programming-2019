import http from "./httpService";
import {apiUrl} from "../../config.json";
import jwtDecode from "jwt-decode";
import { AsyncStorage } from "react-native";

const apiEndpoit = apiUrl + "/auth";
const tokenKey = "token";
const tokenKeyConnected = "tokenConnected";

http.setJwt(getJwt());

export async function login(email, password, isAdmin){
	const {data: jwt} = await http.post(apiEndpoit, {email, password, isAdmin});
	AsyncStorage.setItem(tokenKey, jwt);
}

export async function connectedWith(email, password){
	const {data: jwt} = await http.post(apiEndpoit, {email, password});
	AsyncStorage.setItem(tokenKeyConnected, jwt);
}

export function loginWithJwt(jwt){
	AsyncStorage.setItem(tokenKey, jwt);
}

export async function logout(){
	AsyncStorage.removeItem(tokenKey);
}

export async function getCurrentUser(){
	try{
		let jwt = "";
		await AsyncStorage.getItem("token").then(res => {jwt = res}).catch((err) => {console.log("ERROR",err)});
		return jwtDecode(jwt);
	}
	catch(ex){
		return null;
	}
}

export async function getCurrentConnectedUser(){
	try{
		let jwt = "";
		await AsyncStorage.getItem("tokenConnected").then(res => {jwt = res}).catch((err) => {console.log("ERROR",err)});
		return jwtDecode(jwt);
	}
	catch(ex){
		return null;
	}
}

export function getJwt(){
	return AsyncStorage.getItem(tokenKey);
}

export default{
	login,
	connectedWith,
	loginWithJwt,
	logout,
	getCurrentUser,
	getCurrentConnectedUser,
	getJwt
}
