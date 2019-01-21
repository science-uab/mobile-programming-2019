const Joi = require("joi");
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 150
	},
	image: {
		type: String,
		data: Buffer,
		default: ""
	}
});

const Medicine = mongoose.model("Medicine", medicineSchema);

function validateMedicine(medicine) {
	const schema = {
		name: Joi.string()
			.min(2)
			.max(150)
			.required(),
		image: Joi.string()
	};

	return Joi.validate(medicine, schema);
}

exports.Medicine = Medicine;
exports.validate = validateMedicine;