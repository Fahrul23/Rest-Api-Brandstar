const { validationResult } = require("express-validator");
const ProductModel = require('../model/product');
const path = require('path');
const fs = require('fs');

exports.getAllProduct=(req,res,next) =>{
    
    ProductModel.find()
    .then(result =>{
        res.status(200).json({
            message : 'Get All Product Success!!!',
            data: result     
        });        
    })
    .catch(err => {
        next(err);
    });
}

exports.getProductById=(req,res,next)=>{
    ProductModel.findById(res.params.id)
    .then(result =>{

        if(!result){
            const err = new Error()
            err.errorStatus=404;
            throw error;
        }
        res.status(200).json({
            message: 'Get Product By Id Success!!!',
            data:result
        })
    })
    .catch(err => {
        next(err);
    })
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

exports.updateProduct=(req,res,next) =>{
    
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
    const desc = req.body.description;
    const ProductId = req.params.id

    ProductModel.findById(ProductId)
    .then(product =>{
        if(!product){
            const err = new Error('Product tidak ditemukan');
            err.errorStatus = 404;
            throw error
        }
        product.name = name;
        product.price = price;
        product.image = image;
        product.desc=desc;
        
        return product.save()
    })
    .then(result =>{
        res.status(202).json({
            message : 'Update Product Success!!',
            data:result
        })
    })
    .catch(err => {
        next(err)
    })

}

exports.deleteProduct = (req,res,next) =>{
    const ProductId= req.params.id;

    ProductModel.findById(ProductId)
    .then(product =>{
        if(!product){
            const err = new Error('Product not Found');
            err.errorStatus = 404;
            throw error;
        }
        removeImage(product.image);
        
        return ProductModel.findByIdAndDelete(ProductId);
    })
    .then(result =>{
        res.status(200).json({
            message: 'Delete Product Success',
            data: result
        })
    })
    .catch(err =>{
        next(err)
    })
}

const removeImage = (filePath)=>{
    filePath = path.join(__dirname,'../../',filePath); 
    fs.unlink(filePath, err => console.log(err));
}


