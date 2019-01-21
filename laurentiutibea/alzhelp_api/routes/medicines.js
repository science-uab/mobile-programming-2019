const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {Medicine, validate} = require("../models/medicine");
const fs = require("fs");

router.get("/", async (req, res) =>{
	const medicines = await Medicine.find().select("-__v").sort("name");

	res.send(medicines);
});

router.get("/:id", async (req, res) =>{
	const medicine = await Medicine.findById(req.params.id).select("-__v");

	if (!medicine) return res.status(404).send("The medicine with the given ID was not found.");

	res.send(medicine);
});

router.post("/", async (req, res) => {
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	let medicine = await Medicine.findById(req.params.id);
	if (medicine) return res.status(400).send('Already in list.');

	medicine = new Medicine(_.pick(req.body, ["name", "image"]));

	await medicine.save();
	res.send(medicine);
});

router.delete("/:id",  async (req, res) => {
  const medicine = await Medicine.findByIdAndRemove(req.params.id);

  if (!medicine)
    return res.status(404).send("The medicine with the given ID was not found.");

  res.send(medicine);
});

/*router.put("/:email", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const info = await Info.findOneAndUpdate(
		req.params.email,
		{
			email: req.body.email,
			locationInfo: req.body.locationInfo,
			pushToken: req.body.pushToken
		},
		{ new: true }
	);

	if (!info) return res.status(404).send("The info with the given email was not found.");

	res.send(info);
});*/

module.exports = router;