const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
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


app.use('/v1/product', productRoutes)

// app.use('/v1/product',productRoutes);


app.listen(4000,() => console.log('server running'))











