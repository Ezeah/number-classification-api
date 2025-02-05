const express = require('express');
const numberController = require('../controllers/numberController');

const router = express.Router();

router.get('/classify-number', numberController.classifyNumber.bind(numberController));

module.exports = router;