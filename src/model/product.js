const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name :{
        type: String,
        require: true
    },
    price :{
        type :String,
        require : true
    },
    image :{
        type :String,
        require : true
    },
    description :{
        type :String,
        require : true
    }

},{
    timestamps :true
});

module.exports = mongoose.model('Product',Product);