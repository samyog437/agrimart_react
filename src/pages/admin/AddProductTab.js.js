import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const AddProductTab = ({ handleSubmit, title, handleTitleChange, price, handlePriceChange, handleImageChange, previewImage }) => {
  const { TextArea } = Input;

  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item
        label="Title"
        rules={[
          {
            required: true,
            message: "Field cannot be empty!",
          },
        ]}
      >
        <Input value={title} onChange={handleTitleChange} />
      </Form.Item>

      <Form.Item
        label="Price"
        rules={[
          {
            required: true,
            message: "Field cannot be empty!",
          },
        ]}
      >
        <Input value={price} onChange={handlePriceChange} />
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList">
        <div>
          <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="preview-container">
          {previewImage && <img src={previewImage} alt="Product Thumbnail" />}
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit} style={{ width: "30%" }}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductTab;
