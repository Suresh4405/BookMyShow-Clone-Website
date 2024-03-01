import React, { useEffect, useState } from "react";
 import { GetAllTheatres,UpdateTheatre } from "../../Pages/Apicalls/theatre";
import { Button, message, Table } from "antd";

function Showtheaterlist() {
  const [theatres, setTheatres] = useState([]);
  

  const getData = async () => {
    try {
      const response = await GetAllTheatres();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
     
    } catch (error) {
      
      message.error(error.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => {
        return record.owner.username;
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isActive && (
              <Button style={{backgroundColor:"brown",color:"aliceblue"}}
                 onClick={() => handleStatusChange(record)}
              >
                Block
              </Button>
            )}
            {!record.isActive && (
              <Button
                style={{backgroundColor:"lightgreen",color:"aliceblue"}}
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  
  useEffect(() => {
     getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={theatres}  />
    </div>
  );
}

export default Showtheaterlist;