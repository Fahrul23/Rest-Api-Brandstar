var express = require('express')
var router = express.Router();
const { body} = require('express-validator');
const productController = require('../controllers/product');


router.get('/',productController.getAllProduct);
router.get('/:id',productController.getProductById);
router.post('/create',[
            body('name').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
            body('price').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
            body('description').isLength({ min: 5 }).withMessage('must be at least 5 chars long')],
            productController.createProduct);
router.put('/update/:id',[
    body('name').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('price').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('description').isLength({ min: 5 }).withMessage('must be at least 5 chars long')],
    productController.updateProduct)

module.exports = router;