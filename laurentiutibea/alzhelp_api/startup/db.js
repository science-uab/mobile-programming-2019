const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
	const db = config.get("db");
	console.log(db);
	mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
		.then(() => console.log(`Connected to ${db}...`))
		.catch(() => console.log("Cannot connect to database!"));
};