const axios = require('axios');
const status = require('app/constants/status');
const errorMessages = require('app/constants/response_messages');
const errorCodes = require('app/constants/response_codes');

module.exports = {
    get : (url, params, header) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: url,
                headers: header,
                params: params
            }).then((response) => {
                if (response.data.status === status.ERROR) {
                    return reject(response.data)
                }
                return resolve(response.data);
            }).catch((error) => {
                return reject(handleError(error))
            });
        });
    },

    post: function (url, payload, params, header, timeout) {
        return new Promise((resolve, reject) => {
            let request = {
                method: 'POST',
                url: url,
                headers: header,
                data: payload,
                params: params
            };
            if (timeout) {
                request.timeout = timeout;
            }
            axios(request).then((response) => {
                if (response.data.status === status.ERROR) {
                    return reject(response.data)
                }
                return resolve(response.data);
            }).catch((error) => {
                return reject(handleError(error))
            });
        });
    }
};


const handleError = (error) => {
    if (!error.response) {
        return {
            status: status.ERROR,
            message: errorMessages.INTERNAL_SERVER_ERROR,
            code: errorCodes.INTERNAL_SERVER_ERROR
        }
    }

    return error.response.data;
};