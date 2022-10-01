const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const app = express();
app.use(express.json());
const cors = require("cors")
dotenv.config();


mongoose.connect( process.env.MONGODB_URL
).then(()=> console.log('DB connection is successfull')).catch((err)=>{console.log(err)})
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log( `backend server is running `)

})

