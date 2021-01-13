var express = require('express')
var router = express.Router();

const producController = require('../controllers/product');

router.get('/',producController.getAllProduct);

module.exports = router;