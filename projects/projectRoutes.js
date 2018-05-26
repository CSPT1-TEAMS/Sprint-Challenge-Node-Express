const express = require('express');
const actionDb = require('../data/helpers/projectModel.js');

const router = express.Router();
router.use(express.json());

module.exports = router;