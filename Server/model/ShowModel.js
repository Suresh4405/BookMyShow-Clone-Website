const mongoose = require("mongoose");


const showSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  time: {
    required: true,
    type: String,
  },
  movies: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
  ticketPrice: {
    required: true,
    type: Number,
  },
  totalSeats: {
    required: true,
    type: Number,
  },

  // bookedSeats: {
  //   required: true,
  //   type: String,
  // },

  // theatre: {
  //   required: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "theatre",
  // },
});

module.exports = mongoose.model("shows", showSchema);