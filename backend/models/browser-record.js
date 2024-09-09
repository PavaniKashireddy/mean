const mongoose = require('mongoose');

const browserInfoSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	version: { type: String, required: true },
}, { _id: false });

const recordSchema = new mongoose.Schema({
	browserInfo: { type: browserInfoSchema, required: true },
	quantity: { type: Number, required: true }
}, {
	timestamps: true
});

/*
 * Mongoose by default adds createdAt & updatedAt since we made timestamps as true
 */
const Record = mongoose.model('BrowserRecord', recordSchema);
module.exports = Record;
