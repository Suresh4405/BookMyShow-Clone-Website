const mongoose=require("mongoose")

// MovieSchema

const MovieSchema=mongoose.Schema({

    movieName:{
        required:true,
        type:String
    },
    description:{     
        required:true,
        type:String
    },
    duration:{     
        required:true,
        type:String
    },
    language:{
             
        required:true,
        type:String
    },
    releaseDate:{
             
        required:true,
        type:String
    },
    genre:{
             
        required:true,
        type:String
    },
    posterUrl:{
             
        required:true,
        type:String
    },
})

module.exports=mongoose.model("movies",MovieSchema)