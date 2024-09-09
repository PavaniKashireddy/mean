const express = require('express');
const router = express.Router();
const BrowserRecord = require('../models/browser-record');
const browserCheck = require('../middlewares/browserCheck');
const message = require('../utils/messages');
const Response = require('../utils/response');

// Create Record
router.post('/create', browserCheck, async (req, res) => {
	try {
		const totalRecords = await BrowserRecord.countDocuments();
		const quantity = totalRecords + 1;
		await BrowserRecord.create({
			browserInfo: req.body.browserInfo,
			quantity
		});
		res.status(200).json(new Response(true, message.default.success, { message: "Record successfully created." }));
	} catch (error) {
		console.log(req.path);
		console.error('Error creating record:', error);
		res.status(500).json(new Response(false, message.default.failure, { message: "Error in creating record." }));
	}
});

// Retrieve all Records
router.get('/records', async (req, res) => {
	try {
		/**
		 * If there are too many documents use pagination, skip and limit
		*/
		const records = await BrowserRecord.find();
		res.status(200).json(new Response(true, message.default.success, { records }));
	} catch (error) {
		console.log(req.path);
		console.error('Error retrieving records:', error);
		res.status(500).json(new Response(false, message.default.failure, { records: [] }));
	}
});

// Get sum of quantities
router.get('/sum', async (req, res) => {
	try {
		const sum = await BrowserRecord.aggregate([{ $group: { _id: null, totalSum: { $sum: "$quantity" } } }]);
		const totalSum = sum.length > 0 ? sum[0].totalSum : 0;
		res.status(200).json(new Response(true, message.default.success, { totalSum }));
	} catch (error) {
		console.log(req.path);
		console.error('Error getting sum:', error);
		res.status(500).json(new Response(false, message.default.failure, { totalSum: 0 }));
	}
});

module.exports = router;
