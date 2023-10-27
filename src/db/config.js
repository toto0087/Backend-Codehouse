import mongoose from 'mongoose';
export const URI = 'mongodb+srv://totojajaxd:L2ohuAeL8pBfk49n@cluster0.ekq4i4y.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose
    .connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 

