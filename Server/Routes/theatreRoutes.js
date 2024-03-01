const express = require("express");
const router = express.Router();
const Theatre = require("../model/theatremodel");
const Show = require("../model/ShowModel");


router.post("/add-theatre", async (req, res) => {
  try {
    const newtheare = new Theatre(req.body);
    await newtheare.save();

    res.send({
      success: true,
      message: "theatre added successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: "theatre went  wrong",
    });
  }
});

router.post("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "theatre updated successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: "theatre went  wrong",
    });
  }
});




router.post("/delete-theater",async(req,res)=>{
  try {
      
 
  await Theatre.findByIdAndDelete(req.body.theatreId)
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


router.post("/get-all-theatre-by-owner", async (req, res) => {
  try {
    const theatre = await Theatre.find({ owner: req.body.owner });
    console.log(theatre);
    res.send({
      success: true,
      message: "theatre fetched successfully",
      data: theatre,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "theatre went  wrong",
    });
  }
});


router.get("/get-all-theatre", async (req, res) => {
  try {
    const theatre = await Theatre.find().populate("owner");

    console.log(theatre);
    res.send({
      success: true,
      message: "theatre fetched successfully",
      data: theatre,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "theatre went  wrong",
    });
  } 
});



// Shows router



router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId });

    res.send({
      success: true,
      message: "theatre fetched successfully",
      data: shows,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "theatre went  wrong",
    });
  }
});



router.post("/add-shows", async (req, res) => {
  try {
    const newshow = new Show(req.body);
    await newshow.save();
    console.log(newshow);

    res.send({
      success: true,
      message: "shows added successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "shows went  wrong",
    });
  }
});


router.post("/delete-shows",async(req,res)=>{
  try {
      
 
  await Show.findByIdAndDelete(req.body.showId)
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





module.exports = router;