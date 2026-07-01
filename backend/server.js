const express = require('express');
const authRouter = require("./routes/authRouter")
const productRouter = require("./routes/productRouter");
const dbConnection = require('./config/dbConnection');
const cookieParser = require("cookie-parser")
const app = express()


require('dotenv').config()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/product', productRouter)

// Connect to database first
dbConnection()

app.listen(PORT, () => {
    console.log(`server running in ${PORT}`)
})