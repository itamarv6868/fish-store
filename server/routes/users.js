var express = require('express');
var router = express.Router();
const { register } = require('../controllers/user.controller');
const mid = require('../middleware/mid');


router.post("/register", register);

module.exports = router;