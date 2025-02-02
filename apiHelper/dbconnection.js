const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.MONGO_URI);

const dbConnect = async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database connected");
        
    })
}

module.exports = {dbConnect}