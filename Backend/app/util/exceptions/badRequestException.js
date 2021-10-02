const ApplicationException = require('./applicationException');
class BadRequestException extends ApplicationException {
	constructor(msg) {
		super(msg || 'Bad request', 400);
	}
}
module.exports = BadRequestException;