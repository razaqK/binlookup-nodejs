'use strict';
require('dotenv').config();

module.exports = {
    app_name: "jay-service",
    app_env: process.env.APPLICATION_ENV,
    server: {
        port: process.env.PORT,
        allow_origin: '*'
    },
    api: {
        bin_look_up: process.env.BIN_LOOK_UP_URL
    }
};