const mongoose = require('mongoose')
require('dotenv').config()


exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI,{
        // useNewUrlParser:true,
        // useUnifiedTopology : true,
    })
    .then(()=>{
        console.log("db connected successfullyy yehe");
        
    }).catch(()=>{
        console.log("did not connnect");
        process.exit(1)
        
    })
}