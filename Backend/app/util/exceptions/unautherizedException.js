const ApplicationException = require('./applicationException');
class UnauthorizedException extends ApplicationException {
	constructor(msg) {
		super(msg || 'Unauthorized action', 401);
	}
}
module.exports = UnauthorizedException;