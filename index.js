const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const productRoutes = require('./src/routes/product');

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


app.use(bodyParser.json());

app.use('/v1/product', productRoutes);


app.use((error, req,res,next)=>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message:message,
        data : data
    });
})

mongoose.connect('mongodb://localhost/product',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(4000,() => console.log('server running'))
})
.catch(err => console.log(err));











