

const config = require('app/config/config');

const sendResponse = require('app/components/send_response');
const errorMessages = require('app/constants/response_messages');
const errorCodes = require('app/constants/response_codes');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const route = require('app/routes/route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/v1', route.card);

app.use('/', function(req, res) {
    return sendResponse.sendError(req, res, {
        status_code: 200,
        message: errorMessages.NOT_IMPLEMENTED,
        code: errorCodes.NOT_IMPLEMENTED
    })
});

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
});