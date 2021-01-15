const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const productRoutes = require('./src/routes/product');
var multer  = require('multer');

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


const filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '-' + file.originalname)
    }
  })

  const fileFilter = (req,file,cb) =>{
      if(
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg' 
      ){
          cb(null,true);
      }else{
          cb(null,false);
      }
  }

app.use(multer({storage : filestorage, fileFilter:fileFilter}).single('image'))
  
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

mongoose.connect('mongodb://localhost/product',
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>{
    app.listen(4000,()=> console.log('server running'))
})
.catch(err => console.log(err));














