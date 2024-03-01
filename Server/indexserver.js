const express= require("express")
const app=express()
const userRoutes=require("../Server/Routes/userRoutes")
const cors =require("cors")
require("dotenv").config()
const Movierouter=require("../Server/Routes/MovieRoutes")

const Theaterrouter=require("../Server/Routes/theatreRoutes")
const dbconfig=require("./config/dbconfig")
app.use(express.json())


app.use(cors())
app.use("/user",userRoutes)
app.use("/movie",Movierouter)
app.use("/theatre",Theaterrouter)

app.get("/",(req,res)=>{
    res.send("Hi Iam Suresh")
})

app.listen(7776,()=>{
    console.log("Working on port 7776");
})
