import  { Schema, model } from "mongoose";

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: Number,
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
        required: true,
    },
    category: {
        type: String,
        required: true
    }
});

export const productsModel = mongoose.model('Products', productsSchema);