const sendResponse = require('app/components/send_response');
const cardHandler = require('app/handlers/card');

module.exports = {
    getScheme: (req, res) => {
        cardHandler.getScheme(req).then((response) => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch((error) => {
            console.log(error)
            return sendResponse.sendError(req, res, error);
        });
    }
};