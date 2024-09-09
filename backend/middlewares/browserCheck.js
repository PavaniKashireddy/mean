const message = require('../utils/messages');
const Response = require('../utils/response');

function browserCheck(req, res, next) {

	const browserInfo = req.body.browserInfo;
	if (browserInfo && browserInfo.name && browserInfo.version) {
		next();
	} else {
		res.status(400).json(new Response(false, message.default.badRequest, { message: 'Browser information is missing. Please include browser name and version.' }));
	}
}

module.exports = browserCheck;

