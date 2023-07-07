import { Modal, Rate, Form, Input, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const Review = ({ visible, onCancel, token }) => {
  const location = useLocation();
  const [form] = Form.useForm();
  const path = location.pathname.split("/")[2];
  const [review, setReview] = useState();
  const [rating, setRating] = useState(1);
  const config = { headers: {Authorization: `Bearer ${token}`} };

  const onFinish = async () => {
    try {
      console.log(`Bearer token is ${config.headers.Authorization}`)
      const newReview = { 
        body: review,
        rating: rating,
      };
      await axios.post(`/products/${path}/reviews`, newReview, config);  
      console.log("Review submitted successfully");
      window.location.replace(`/products/${path}`);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };
  

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };
  

  return (
    <Modal
      open={visible}
      title="Rate Product"
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} onFinish={onFinish} onChange={handleChange} >
        <Form.Item name="rating" label="Rate">
          <Rate initialValues={0} onChange={handleRatingChange} style={{ color: "#F49723" }} />
        </Form.Item>
        <Form.Item name="comments" label="Review">
          <Input.TextArea name="review" autoSize={{ minRows: 4, maxRows: 8 }} />
        </Form.Item>
        <Form.Item>
          <Button style={{backgroundColor:"#289A43", color:"white"}} htmlType="submit">
            Submit Rating
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Review;
