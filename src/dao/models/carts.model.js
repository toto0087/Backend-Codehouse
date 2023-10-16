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
            required: true
        }
    }],
});

export const cartsModel = model('Carts', cartsSchema);