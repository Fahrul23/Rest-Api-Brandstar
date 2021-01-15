const { validationResult } = require("express-validator");
const ProductModel = require('../model/product');

exports.getAllProduct=(req,res,next) =>{
    
    const result ={
        message: 'All Product Success',
        data:{
            name: 'pot putih',
            price: 20000
        }
    }

    res.status(200).json(result);
    next();
    
}

exports.createProduct= (req,res,next)=>{
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       const err = new Error('Invalid Value');
       err.errorStatus = 400;
       err.data = errors.array();
       throw err;
    }
    if(!req.file){
       const err = new Error('Image must be uploaded');
       err.errorStatus = 400;
       err.data = errors.array();
       throw err;
    }
    
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file.path;
    const desc = req.body.description
    
    
    const createProduct = new ProductModel({
        name : name,
        price: price,
        image: image,
        description : desc
    });

    createProduct.save()
    .then(result =>{
        res.status(201).json({
            message : 'Create Product Success!!!',
            data: result     
        });
    })
    .catch(err => console.log(err))
    

}