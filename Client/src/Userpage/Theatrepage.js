import React, { useEffect, useState } from 'react';
import { Table, message, Button } from 'antd';
import TheatreForm from './TheatreForm';
import { GetAllTheatresByOwner ,DeleteTheatre} from '../Pages/Apicalls/theatre';
import {  useSelector } from "react-redux";
import Show from "./Shows/Show"
const Theatrepage = () => {
  const [showTheatreFormModal, setShowTheatreFormModal] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState('add');
  const { profile } = useSelector((state) => state.users);
  const [openShowsModal ,setOpenShowsModal] = useState(false);

  
  const getData = async () => {
    try {
      const response = await GetAllTheatresByOwner({
        owner: profile._id,
      });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Something went wrong with fetching theatres');
    }
  };


  const ondelete= async(theatreId)=>{

          try {
            const response = await DeleteTheatre({
              theatreId,
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
  }



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: text => (text ? 'Approved' : 'Pending / Blocked'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <div className="flex gap-1">
          <button style={{ border: 'none' }} onClick={() => {
            setShowTheatreFormModal(true);
            setSelectedTheatre(record);
            setFormType('edit');
          }}>
            <i className="ri-pencil-line" style={{ fontSize: '20px', color: 'green' }}></i>
          </button>
          <button style={{ border: 'none' }} onClick={() => {
            ondelete(record._id);
          }}>
            <i className="ri-delete-bin-7-line" style={{ fontSize: '20px', color: 'brown' }}></i>
          </button>

          {record.isActive && (
              <Button
                style={{backgroundColor:"lightblue",marginLeft:"50px"}}
                onClick={() => {
                  setSelectedTheatre(record);
                  setOpenShowsModal(true);
                }}
              >
                Add Shows
              </Button>
            )}

        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          style={{ marginLeft: '90%', backgroundColor: 'deepskyblue' }}
          variant="outlined"
          title="Add Theatre"
          onClick={() => {
            setFormType('add');
            setShowTheatreFormModal(true);
          }}
        >
          Add Theatre
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Table columns={columns} dataSource={theatres} rowKey="id" />
      </div>
      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {openShowsModal &&(
        <Show
        openShowsModal={openShowsModal}
        setOpenShowsModal={setOpenShowsModal}
        theatre={selectedTheatre}
        />
      )}
    </div>
  );
};

export default Theatrepage;
