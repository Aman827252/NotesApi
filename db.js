const mongoose=require("mongoose");
const dotenv=require("dotenv").config()
const MONGO_URI=process.env.MONGO_URI;

const connectToMongo=()=>{
    try {
        mongoose.connect(MONGO_URI).then(()=>{
            console.log("Connected To Mongo Successfully");
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectToMongo;