import { useState, useEffect } from "react";
import { GetAllMovies } from "../Pages/Apicalls/movie";
import "./Cardcomp.css";
import Carouselcomp from "./Carouselcomp";
import Cardcomp from "./Cardcomp";

function Homecomp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await GetAllMovies();
        if (response.success) {
          setData(response.data);
        } else {
          console.error(
            "Data fetched is not in the expected format:",
            response
          );
        }
      } catch (error) {
        console.log(error, "error in table fetch");
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <Carouselcomp data={data} />
      </div>

      <div className="card-align">
        <div div className="row">
          {data.map((dd, index) => (
            <div key={index} className="col-3">
              <Cardcomp
                dataid={dd._id}
                moviename={dd.movieName}
                posterurl={dd.posterUrl}
                modescription={dd.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homecomp;
