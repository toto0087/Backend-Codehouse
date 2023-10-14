import mongoose from 'mongoose';
const URI = 'mongodb+srv://tobias:tobias@cluster0.ekq4i4y.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose
    .connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 