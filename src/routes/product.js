var express = require('express')
var router = express.Router();
const { body} = require('express-validator');
const producController = require('../controllers/product');


router.get('/',producController.getAllProduct);
router.post('/create',[
            body('name').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
            body('price').isLength({ min: 5 }).withMessage('must be at least 5 chars long')],
            producController.createProduct)

module.exports = router;