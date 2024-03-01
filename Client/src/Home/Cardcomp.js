import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Cardcomp.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Cardcomp = ({ dataid, moviename, posterurl, modescription }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        className="New-var"
        onClick={() =>
          navigate(`/movie/${dataid}?date=${moment().format("YYYY-MM-DD")}`)
        }
      >
        <Card.Img className="card-img" variant="top" src={posterurl} />
        <Card.Body>
          <Card.Title style={{ color: "brown", textAlign: "center" }}>
            {" "}
            {moviename}
          </Card.Title>
          <Card.Text style={{ color: "lightgreen", textAlign: "center" }}>
            {modescription}
          </Card.Text>
          <Button
            style={{
              color: "white",
              backgroundColor: "deepskyblue",
              marginLeft: "30%",
            }}
          >
            Book now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardcomp;
