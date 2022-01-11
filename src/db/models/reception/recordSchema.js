const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordSchema = new Schema({
	patient: String,
	doctor: String,
	date: { type: Date, default: Date.now },
	symptoms: String,
});

module.exports = Record = mongoose.model("records", recordSchema);
