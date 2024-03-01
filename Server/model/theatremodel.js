const mongoose=require("mongoose")



const theatreschema=mongoose.Schema({

    name:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    owner:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"DATA"  
    },
    isActive:{
        default:false,
       type:Boolean
    },

})


module.exports=mongoose.model("theatre",theatreschema)
