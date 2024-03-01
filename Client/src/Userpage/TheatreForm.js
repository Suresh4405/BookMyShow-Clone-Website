import React from 'react';
import { Col, Form, Modal, Row, Button, message, Input, Select } from "antd";
import {AdddTheatre,UpdateTheatre} from "../Pages/Apicalls/theatre"
import {  useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData
})
{

  const { profile } = useSelector((state) => state.users);

  const onFinish=async(values)=>{
    values.owner=profile._id
  try {
      let response = null;

      if (formType === "add") {
        response = await AdddTheatre(values);
      } else {
        response = await UpdateTheatre({
          ...values,
          theatreId: selectedTheatre._id,
        });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowTheatreFormModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    
  };


  }

return(

  <div>
  <Modal
  title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
  open={showTheatreFormModal}
  onCancel={() => {
    setShowTheatreFormModal(false);
    setSelectedTheatre(null);
  }}
  footer={null}
>
  <Form layout="vertical" onFinish={onFinish} initialValues={selectedTheatre}>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the theater name!' }]}>
              <Input Input type="text"/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please Enter your Address" }]}>
              <Input type="text"/>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Phone Number" name="phone">
              <Input type="text" rules={[{ required: true, message: "Please Enter Phone Number" }]} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input theatre email!" }]}>
              <Input type="email" />
            </Form.Item>
          </Col>
        </Row>

        <div className="todo">
          <Button
            type="primary"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
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
      </div>
)
}

export default TheatreForm
