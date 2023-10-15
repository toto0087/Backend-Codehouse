import  { Schema, model } from "mongoose";

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
        unique: true
    },
    thumbnail: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false
    }
});

export const productsModel = model('Products', productsSchema);