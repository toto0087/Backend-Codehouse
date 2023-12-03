import  { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsSchema = new Schema({ 
    products: [{
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

cartsSchema.pre(['find', 'findOne', 'findOneAndUpdate', 'findById'], function () {
    this.populate('products');
});


// Middleware para paginación
cartsSchema.plugin(mongoosePaginate)


export const cartsModel = model('Carts', cartsSchema);