const mongoose=require("mongoose")


mongoose.connect(process.env.mongodb_url,{
    dbName:"MOVIESDATA"
})

const isconnection=mongoose.connection

isconnection.on("connected",()=>{
    console.log("Trying to do better");
})
isconnection.on("error",(err)=>{
    console.log("Error in Mongodb",err);
})