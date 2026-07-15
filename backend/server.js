const express = require('express');
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter")
const orderRouter = require("./routes/orderRouter")
const paymentRouter = require("./routes/paymentRouter")
const dbConnection = require('./config/dbConnection'); 
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");


require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // React app
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
// app.use('/api/admin', adminRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payments',paymentRouter);
app.use('/api/orders',orderRouter);

// Connect to database first
dbConnection();

app.listen(PORT, () => {
    console.log(`server running in ${PORT}`)
});