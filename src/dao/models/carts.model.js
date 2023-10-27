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

cartsSchema.pre(['find','findOne','findById','findOneAndUpdate'], function(next) {
    this.populate('products.id');
    next();
});

export const cartsModel = model('Carts', cartsSchema);