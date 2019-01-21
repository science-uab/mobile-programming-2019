const express = require("express");
const error = require("../middleware/error");
const users = require("../routes/users");
const auth = require("../routes/auth");
const infos = require("../routes/infos");
const medicines = require("../routes/medicines");

module.exports = function(app){
	app.use(express.json());
	app.use("/api/users", users);
	app.use("/api/auth", auth);
	app.use("/api/infos", infos);
	app.use("/api/medicines", medicines);
	app.use(error);
};