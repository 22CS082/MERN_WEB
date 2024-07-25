
// require('dotenv').config();

const mongoose = require("mongoose");


const URI ='mongodb+srv://yashvii:IgTxdxWOz8xVvCtI@cluster0.vssfous.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connected to db");
    } catch (error) {
        console.log(error);
        console.error("not connected");
        process.exit(0);
    }
};
module.exports =connectDb;
