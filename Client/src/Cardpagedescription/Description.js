import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { GetMovieById } from "../Pages/Apicalls/movie";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./description.css"

function Description() {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    try {
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
      movie && (
    <div className="changee"  style={{ backgroundImage: `url(${movie.posterUrl})` }}>
      <div className="aligns">
      <img src={movie.posterUrl} className="psddd" />
      </div>
      <div className="text">
      <h1 className="movie-name">{movie.movieName}</h1>
      <div className="Texted2">
          <p className="movie-language">Language: {movie.language}</p>
          <p className="movie-duration">Duration: {movie.duration} mins</p>
         <p className="release-date">
           Release Date: {moment(movie.releaseDate).format("Do-MMM-YYYY")}
         </p>
         <p className="movie-genre">Genre: {movie.genre}</p>
         </div>
         <div className="NOdss">
         <button className="Namess">Book Tickets</button>
         </div>
      </div>
      
    </div>
  
      )
    
  );
}

export default Description;
