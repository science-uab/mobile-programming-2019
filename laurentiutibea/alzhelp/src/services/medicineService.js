import http from "./httpService";
import {apiUrl} from "../../config.json";

const apiEndpoit = apiUrl + "/medicines";

export function getMedicines(){
	return http.get(apiEndpoit);
}

export function getMedicine(medicineId){
	return http.get(apiEndpoit+"/"+medicineId);
}

export function addMedicine(medicine){
	return http.post(apiEndpoit, {
		name: medicine.name,
		image: medicine.image
	});
}

export function deleteMedicine(medicineId){
	return http.delete(apiEndpoit+"/"+medicineId);
}

export default{
	getMedicines,
	getMedicine,
	addMedicine,
	deleteMedicine
}