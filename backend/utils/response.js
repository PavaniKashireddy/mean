const Response = function (status, message, data) {
	this.status = status ? status : false;
	this.message = message ? message : '';
	this.data = data ? data : {};
};
module.exports = Response;