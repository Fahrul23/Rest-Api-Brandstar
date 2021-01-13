var express = require('express')
var router = express.Router();

const producController = require('../controllers/product');


router.get('/',producController.getAllProduct);
router.post('/create',producController.createProduct)

module.exports = router;