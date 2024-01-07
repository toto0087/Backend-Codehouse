import  { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false
    },
    owner: {
        type: String, 
        required: false,
        default: 'admin', 
    },
});

productsSchema.plugin(mongoosePaginate);
export const productsModel = model('Products', productsSchema);