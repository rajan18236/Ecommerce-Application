const mongoose = require('mongoose');
require('dotenv').config()

const dbConnection = () => {

    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log(`Connect to database successfully`);

    }).catch((err) => {
        console.log("Unable to connect to database:", err.message)
        process.exit(1);
    })
} 
 
module.exports = dbConnection