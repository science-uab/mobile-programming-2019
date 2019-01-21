const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {Info, validate} = require("../models/info");

router.get("/:email", async (req, res) =>{
	const info = await Info.findOne({email: req.params.email}).select("-__v");

	if (!info)
		return res.status(404).send("The info with the given email was not found.");

	res.send(info);
});

router.post("/", async (req, res) => {
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	let info = await Info.findOne({ email: req.body.email });
	if (info) return res.status(400).send('Already registered.');

	info = new Info(_.pick(req.body, ["email", "pushToken", "locationInfo"]));

	await info.save();

	const token = info.generateAuthToken();
	res.header("x-auth-tokenInfo", token).send(_.pick(info, ["_id", "email", "pushToken", "locationInfo"]));
});

router.put("/:email", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const info = await Info.findOneAndUpdate(
		{email:req.params.email},
		{$set:
			{
				email:req.body.email,
				locationInfo:req.body.locationInfo,
				pushToken:req.body.pushToken
			}
		},
		{ new: true}
	);

	if (!info) return res.status(404).send("The info with the given email was not found.");

	res.send(info);
});

module.exports = router;