import { model, Schema } from 'mongoose';

const documentSchema = new Schema({
    name: { type: String },
    reference: { type: String }
});

const connectionSchema = new Schema({
    date: { type: Date, default: Date.now },
    action: { type: String, enum: ['login', 'logout'], required: true } 
});

const userSchema = new Schema({
    full_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        index: true
    },
    birth_date: {
        type: Date,
        required: false,
    },
    password: {
        type: String,
        required:false,
        trim: true,
        minlength: 8,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts',
        required: false
    },
    status: {
        type: String,
        default: 'active'
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'premium', 'admin']
    },
    from_github: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    documents: [documentSchema],
    connections: [connectionSchema]
}, {timestamps: true});


// Middleware para población de 'products.product'
userSchema.pre(['find', 'findOne', 'findOneAndUpdate', 'findById'], function () {
    this.populate('cart');
});



export const usersModel = model('User', userSchema);