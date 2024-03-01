import { Col, Form, Modal, Row, Table, message, Button, Input, InputNumber, DatePicker, Select } from "antd";
import React, { useState, useEffect } from 'react';
import { AddShow, GetAllShowsByTheatre ,Deleteshows} from "../../Pages/Apicalls/theatre";
import { GetAllMovies } from "../../Pages/Apicalls/movie";
import moment from "moment";

function Show({ openShowsModal, setOpenShowsModal, theatre }) {
    const [view, setView] = useState("table");
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [form] = Form.useForm();

    async function fetchData() {
        try {
            const moviesResponse = await GetAllMovies();
            if (moviesResponse.success) {
                setMovies(moviesResponse.data);
            } else {
                message.error(moviesResponse.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    const fetchShowsByTheatre = async () => {
        try {
            const response = await GetAllShowsByTheatre();
            if (response.success) {
                setShows(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchShowsByTheatre();
    }, [theatre._id]);

    const handleDelete = async (showId) => {
        try {
          const response = await Deleteshows({
            showId,
          });
          if (response.success) {
            message.success(response.message);
            fetchShowsByTheatre()
          } else {
            message.error(response.message);
          }
          
        } catch (error) {
          message.error(error.message);
        }
      };
    

    const handleAddShow = async (values) => {
        try {
            const response = await AddShow({
                ...values,
                theatre: theatre._id,
            });

            if (response.success) {
                message.success(response.message);
                setView("table");
                form.resetFields();
                fetchShowsByTheatre(); // Refresh shows data
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: 'Show Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Movie',
            dataIndex: 'movies',
            key: 'movies',
            render: (movieId) => {
                const movie = movies.find(m => m._id === movieId);
                return movie ? movie.movieName : 'Unknown';
            }
        },
        {
            title: 'Ticket Price',
            dataIndex: 'ticketPrice',
            key: 'ticketPrice',
        },
        {
            title: 'Total Seats',
            dataIndex: 'totalSeats',
            key: 'totalSeats',
        },
        {
            title:"Action",
            dataIndex: 'action',
      render: (text, record) => (
       <button style={{border:"none"}} onClick={() => {
              handleDelete(record._id);
            }}>  <i class="ri-delete-bin-7-line"  style={{fontSize:"20px",color:"brown"}}  ></i></button>

    ),
  },
    ];

    return (
        <Modal
            title={`Theatre: ${theatre.name}`}
            visible={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <div className="flex justify-between mt-1 mb-1 items-center">
                <h1 className="text-md uppercase">
                    {view === "table" ? "Shows" : "Add Show"}
                </h1>
                {view === "table" && (
                    <Button type="primary" onClick={() => setView("form")}>Add Show</Button>
                )}
            </div>

            <Table columns={columns} dataSource={shows} rowKey="_id" />

            {view === "form" && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddShow}
                    initialValues={{ date: moment(), time: moment().format("HH:mm") }}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label="Show Name"
                                name="name"
                                rules={[{ required: true, message: "Please input show name!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: "Please input show date!" }]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[{ required: true, message: "Please input show time!" }]}
                            >
                                <Input type="time" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Movie"
                                name="movies"
                                rules={[{ required: true, message: "Please select movie!" }]}
                            >
                                <Select placeholder="Select a movie">
                                    {movies.map(movie => (
                                        <Select.Option key={movie._id} value={movie._id}>
                                            {movie.movieName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Ticket Price"
                                name="ticketPrice"
                                rules={[
                                    { required: true, message: "Please input ticket price!" },
                                ]}
                            >
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Total Seats"
                                name="totalSeats"
                                rules={[
                                    { required: true, message: "Please input total seats!" },
                                ]}
                            >
                                <InputNumber min={1} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="flex justify-end gap-1">
                        <Button onClick={() => setView("table")}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </div>
                </Form>
            )}
        </Modal>
    );
}

export default Show;
