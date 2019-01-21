import http from "./httpService";
import {apiUrl} from "../../config.json";

const apiEndpoit = apiUrl + "/users";

export function register(user){
    return http.post(apiEndpoit, {
        email: user.email,
	    isAdmin: user.isAdmin,
	    name: user.name,
        password: user.password
    });
}