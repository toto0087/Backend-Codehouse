import  { Schema, model } from "mongoose";

const cartsSchema = new Schema({ 
    produts: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            ref: 'Product Quantity',
            required: true
        }
    }],
});

export const cartsModel = mongoose.model('Carts', cartsSchema);