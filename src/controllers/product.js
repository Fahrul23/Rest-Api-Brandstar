const { validationResult } = require("express-validator");

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
    
    const name = req.body.name;
    const price = req.body.price;
    
    const result ={
        message : 'Create Product Success!!!',
            data: {
                id : 1,
                name: name,
                price: price,
                created_at : "12/06/2020"
            }
    }

    res.status(201).json(result);
    
    next();

}