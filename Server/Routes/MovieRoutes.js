const express = require("express")

const router = express.Router()

const Movie =require("../model/Moviemodel")

const authenticat=require("../middleware/authenticat")


router.post("/add-movie",authenticat,async (req,res)=>{
try {

    const movie=await new Movie(req.body)
    await movie.save()
    console.log(movie);
 
    res.send({
        success:true,
        message:"Movie added sucessfully"
    })
 

} catch (error) {
    res.send({
        success:false,
        message:"Movie went wrong"
    })
}
})


router.get("/get-movie",async(req,res)=>{

try {
    const movie= await Movie.find()

// console.log(movie);
    res.send({
        success:true,
        message:"Movie fetch sucessfully",
        data:movie,
    })

} catch (error) {
    res.send({
        success:false,
        message:"Movie went wrong "
    })
}
})

router.post("/delete-movie",authenticat,async(req,res)=>{
    try {
        
   
    await Movie.findByIdAndDelete(req.body.movieId)
    res.send({
        success:true,
        message:"Deleted sucessfully",
        
    })
} catch (error) {

     res.send({
        success:false,
        message:"Unable to delete"
    })   
}

})


router.post("/Edit-movie",async(req,res)=>{

    try {

    await Movie.findByIdAndUpdate(req.body.movieId,req.body)

        res.send({
            success:true,
            message:" Movie Updated sucessfully"
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message:"cant able to update"
        })
    }
})


// particular id to navigate particular page


router.get("/get-movie-by-id/:id", async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
  
      res.send({
        success: true,
        message: "Movie show successfully",
        data: movie,
      });
    } catch (err) {
      res.send({
        success: false,
        message: "Movie went something wrong",
      });
      console.log(err);
    }
  });


module.exports=router


