
// require('dotenv').config();

const mongoose = require("mongoose");




const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db");
    } catch (error) {
        console.log(error);
        console.error("not connected");
        process.exit(0);
    }
};
module.exports =connectDb;
