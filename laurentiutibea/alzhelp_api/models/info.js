const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const infoSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	pushToken: {
		type: String,
		default: "empty"
	},
	locationInfo: {
		type: String,
		default: "empty"
	}
});

infoSchema.methods.generateAuthToken = function(){
	const token = jwt.sign({_id: this._id, email: this.email, pushToken: this.pushToken, locationInfo: this.locationInfo}, config.get("jwtPrivateKey"));
	return token;
};

const Info = mongoose.model("Info", infoSchema);

function validateInfo(info) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		locationInfo: Joi.required(),
		pushToken: Joi.required()	
	};

	return Joi.validate(info, schema);
}

exports.Info = Info;
exports.validate = validateInfo;
