const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
    {
    title: {type: String, required: true, unqiue: true },
    watering: {type: String, required: true},
    light: {type: String, required: true},
    temperature: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: String},
    type: {type: Array},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true},
},
{timestamps: true} 

);

module.exports = mongoose.model('Product', ProductSchema)