import React, { useState, useEffect } from 'react';
import { Table, message, Button } from 'antd';
import Addmovieform from './Addmovieform';
import moment from 'moment';
import { GetAllMovies ,Deletemovie} from '../../Pages/Apicalls/movie';
import "./Moviepage.css"

const Moviepage = () => {
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] =useState(null);
  const [formType, setFormType] = useState("add");


  const getData = async () => {
    try {
      const response = await GetAllMovies();
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };


  const handleDelete = async (movieId) => {
    try {
      const response = await Deletemovie({
        movieId,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      
    } catch (error) {
      message.error(error.message);
    }
  };



  const columns = [
    {
      title: 'Poster',
      dataIndex: 'posterUrl',
      render: (text, record) => (
        <img src={record.posterUrl} alt="poster" height="110" width="150" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'movieName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
    },
    {
      title: 'Language',
      dataIndex: 'language',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      render: (text, record) => moment(record.releaseDate).format('DD-MM-YYYY'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <div className="flex gap-1" style={{display:"flex"}}>

        <button style={{border:"none"}} onClick={() => {
              setShowMovieFormModal(true)
              setSelectedMovie(record);
              setFormType("edit");;
            }}> <i class="ri-pencil-line" Button  style={{fontSize:"20px",color:"green"}}
           ></i></button>
         <button style={{border:"none"}} onClick={() => {
                handleDelete(record._id);
              }}>  <i class="ri-delete-bin-7-line"  style={{fontSize:"20px",color:"brown"}}  ></i></button>

        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='Addbutcomp'>
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add")
          }}
      className='Addbutcolor'  >
          Add Movies
        </Button>
      </div>
      <div style={{marginTop:"15px"}}>
      <Table columns={columns} dataSource={movie} />
      
      {showMovieFormModal && (

        <Addmovieform
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
           getData={getData}
        />
      )}
      </div>
    </div>
  );
};

export default Moviepage;
