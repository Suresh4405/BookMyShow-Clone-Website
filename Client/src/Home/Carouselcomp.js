import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Carousel.css"


const Carouselcomp = ({data}) => {
    
  return (

      <Carousel className='Caro-size'>
      {data.map((dat, index) => (
        <Carousel.Item key={index}>
          <img className='imag-sixe' src={dat.posterUrl} alt={`Slide ${index + 1}`} />
          <Carousel.Caption>
            <h3 className='Name-i'>{dat.movieName}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>

    );
}

export default Carouselcomp;
