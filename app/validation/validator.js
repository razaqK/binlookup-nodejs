const validate = require('express-validation');
const sendResponse = require('app/components/send_response');
const errorMessages = require('app/constants/response_messages');
const errorCodes = require('app/constants/response_codes');

module.exports = {
    handleError: (err, req, res, next) => {
        if (err.errors) {
            let message = [];
            err.errors.forEach((error) => {
                message.push(error.messages)
            });
            message = message.join(', ').replace(/["]/g,'');

            if (err instanceof validate.ValidationError) {
                return sendResponse.sendError(req, res, {
                    status_code: 400,
                    message: `${err.statusText}: ${message}`,
                    code: errorCodes.INVALID_PARAM,
                    error: err
                });
            }
        }

        return sendResponse.sendError(req, res, {
            status_code: 500,
            message: errorMessages.INTERNAL_SERVER_ERROR,
            code: errorCodes.INTERNAL_SERVER_ERROR,
            error: err
        });
    }
};
