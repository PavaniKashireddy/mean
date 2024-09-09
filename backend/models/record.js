const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	browserInfo: {
		name: { type: String, required: true, trim: true },
		version: { type: Number, required: true, trim: true },
	},
	quantity: Number
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
