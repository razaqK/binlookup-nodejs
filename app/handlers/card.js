const errorMessages = require('app/constants/response_messages');
const errorCodes = require('app/constants/response_codes');
const config = require('app/config/config');
const request = require('libs/request_helper');

module.exports = {
    getScheme: (req) => {
        return new Promise((resolve, reject) => {
            try {
                const card_sch = req.params.card_number.substring(0,8);
                request.get(`${config.api.bin_look_up}/${card_sch}`).then(res => {
                    resolve({
                        scheme: res.scheme,
                        type: res.type,
                        bank: (res.bank && res.bank.name) ?  res.bank.name : null
                    })
                }).catch(error => {
                    reject({
                        status_code: 400,
                        message: errorMessages.INTERNAL_SERVER_ERROR,
                        code: errorCodes.INTERNAL_SERVER_ERROR,
                        error: error
                    })
                })
            } catch (error) {
                reject({
                    status_code: 500,
                    message: errorMessages.INTERNAL_SERVER_ERROR,
                    code: errorCodes.INTERNAL_SERVER_ERROR,
                    error: error
                })
            }
        })
    }
};