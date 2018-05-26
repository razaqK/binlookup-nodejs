/**
 * Created by rasaq.kasali on 26/05/2018.
 */

const express = require('express');
const validator = require('app/validation/validator');

const router = express.Router();
const card = require('app/controllers/card');

router.get('/card-scheme/verify/:card_number', card.getScheme);

router.use(validator.handleError);

module.exports = router;