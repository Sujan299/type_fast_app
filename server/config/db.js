const mongoose = require("mongoose");

const connection = async()=>{
    await mongoose.connect(process.env.mongoDBURI).then(()=>{
        console.log("Connected to mongodb successfully !")
    }).catch(()=>{
        console.log("Can not connect mongodb !")
    })
}

module.exports = connection;