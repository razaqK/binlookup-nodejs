/**
 * Created by rasaq.kasali on 26/05/2018.
 */

module.exports = {
    sendSuccess : function(req, res, data, status_code, message) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        return res.status(status_code).json({
            status: true,
            payload: data,
            message: message
        });
    },
    sendError : function (req, res, error) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.method === "OPTIONS") {
            return res.status(error.status_code).end();
        }

        return res.status(error.status_code).json({
            status: false,
            message: error.message,
            code: error.code,
            error: error
        });
    }
};