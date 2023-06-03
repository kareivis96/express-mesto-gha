const { FORBITTEN_ERR_CODE } = require('../constants');
const HttpError = require('./HttpError');

module.exports = class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBITTEN_ERR_CODE, message);
    this.name = 'ForbiddenError';
  }
};
