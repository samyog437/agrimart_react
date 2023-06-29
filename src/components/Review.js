import { Modal, Rate, Form, Input, Button } from "antd";

const Review = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Rating submitted:", values);
    // Perform additional actions such as submitting the rating to the server
    // and handling the submission result
  };

  return (
    <Modal
      visible={visible}
      title="Rate Product"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="rating" label="Rate">
          <Rate defaultValue={0} style={{ color: "#F49723" }} />
        </Form.Item>
        <Form.Item name="comments" label="Review">
          <Input.TextArea />
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
