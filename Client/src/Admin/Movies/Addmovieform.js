import React from "react";
import { Col, Form, Modal, Row, Button, message, Input, Select } from "antd";
import { Addmovie, UpdateMovieList } from "../../Pages/Apicalls/movie";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

function AddMovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  formType,
  getData,
}) {
  const onFinish = async (values) => {
    try {
      let response = null;

      if (formType === "add") {
        response = await Addmovie(values);
      } else {
        response = await UpdateMovieList({
          ...values,
          movieId: selectedMovie._id,
        });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  return (
    <Modal
      title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
      open={showMovieFormModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item label="Movie Name" name="movieName" rules={[{ required: true, message: 'Please input the movie name!' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Movie Description" name="description">
              <TextArea />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Duration (Min)" name="duration">
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Language" name="language">
              <Select>
                <Option value="Tamil">Tamil</Option>
                <Option value="English">English</Option>
                <Option value="Hindi">Hindi</Option>
                <Option value="Telugu">Telugu</Option>
                <Option value="Malayalam">Malayalam</Option>
                <Option value="Kannadam">Kannadam</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Release Date" name="releaseDate">
              <Input type="date" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <Select>
                <Option value="Action">Action</Option>
                <Option value="Comedy">Comedy</Option>
                <Option value="Drama">Drama</Option>
                <Option value="Romance">Romance</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item label="Poster URL" name="posterUrl">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <div className="todo">
          <Button
            type="primary"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovie(null);
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" style={{marginLeft:"10px"}}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddMovieForm;
