import React, { useEffect, useState } from "react";
import profilethumb from "../assets/images/profile-user.png";
import thumb from "../assets/images/thumbnail.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Empty, Form, Input, Modal, Spin, Pagination } from "antd";
import ProductCard from "../components/ProductCard";
import { FormOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

const UserProfile = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];
  const [userData, setUserData] = useState();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    fullname: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Number of orders to display per page
  const token = localStorage.getItem("token");
  const publicFolder = "http://localhost:5000/image/";

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`/user/${path}`);
      setUserData(response.data);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await axios.get(`/delivery`, config);
        setUserData((prevData) => {
          return { ...prevData, deliveries: response.data.deliveries };
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDeliveryData();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedUserData({
      username: userData.username,
      fullname: userData.fullname,
      password: "",
    });
    setIsModalVisible(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(imageFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("username", updatedUserData.username);
      formData.append("fullname", updatedUserData.fullname);
      formData.append("password", updatedUserData.password);

      const response = await axios.put(`/user/${path}`, formData, config);
      setUserData((prevUserData) => {
        return { ...prevUserData, username: response.data.data.username };
      });      
      setEditMode(false);
      setIsModalVisible(false);
      toast.success('Changed user details successfully')
    } catch (err) {
      console.error(err);
      toast.error(err)
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = thumb;
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const getOrderList = () => {
    if (userData && userData.deliveries) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return userData.deliveries.slice(startIndex, endIndex);
    }
    return [];
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return { backgroundColor: "green", color: "white" };
      case "Ongoing":
        return { backgroundColor: "yellow", color: "black" };
      default:
        return { backgroundColor: "transparent", color: "black" };
    }
  };

  return (
    <>
      <div className="text-center">
        <h3 className="page-title">Profile Details</h3>
        {userData && (
          <div className="user-info user-form">
            <div className="user-info-data">
              <div className="profile-img">
                <img
                  src={userData.image ? publicFolder + userData.image : thumb}
                  onError={handleImageError}
                  alt="Profile"
                />
              </div>
              {!editMode && (
                <>
                  <p className="user-info-username">{userData.username}</p>
                  <FormOutlined className="edit-outline" onClick={handleEdit} />
                  <div className="user-data-parent">
                    <div className="user-data-display">
                      <div className="user-data-item">
                        <span className="user-data-item-label">Full Name:</span>
                        <span>{userData.fullname}</span>
                      </div>
                      <div className="user-data-item">
                        <span className="user-data-item-label">Email:</span>
                        <span>{userData.email}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <h3>My Orders</h3>
            <div className="cart-content order-content">
              <div className="cart-body order-body">
                {loading ? (
                  <Spin size="large" /> // Display spinner while loading
                ) : getOrderList().length > 0 ? (
                  getOrderList().map((delivery) => (
                    <div className="cart-list" key={delivery._id}>
                      <div className="order-item-parent">
                        {delivery.products.map((product, index) => (
                          <>
                            <div
                              className="cart-item order-item"
                              key={product._id}
                            >
                              <div className="cart-item-left order-item-left">
                                {product.productId && (
                                  <img
                                    className="product-image"
                                    src={
                                      product.productId.image
                                        ? publicFolder + product.productId.image
                                        : thumb
                                    }
                                    onError={handleImageError}
                                    alt="product"
                                    style={{
                                      width: "100px",
                                      height: "70px",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                                {product.productId && (
                                  <div className="cart-name">
                                    {product.productId.title}
                                  </div>
                                )}
                              </div>
                            </div>
                            {index !== delivery.products.length - 1 && (
                              <hr />
                            )}
                          </>
                        ))}
                      </div>
                      <div
                        className="status vertical-center"
                        style={getStatusStyle(delivery.deliveryStatus)}
                      >
                        {delivery.deliveryStatus}
                      </div>
                      <div className="order-item-parent">
                        {delivery.products.map((product) => (
                          <div className="cart-item" key={product._id}>
                            <div className="cart-item-right order-item-right" style={{fontSize: "20px", fontWeight: 500}}>
                              <span style={{fontSize: "16px"}}>Rs.</span>
                              {product.productId
                                ? product.productId.price
                                : "N/A"}
                            </div>
                          </div>
                        ))}
                        <div className="total-price" style={{color: "red"}}>
                          Total: Rs.{delivery.totalPrice}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span style={{ color: '#888', fontWeight: 'bold', fontSize: '18px' }}>No deliveries found</span>}
                    style={{
                      margin: '20px 0',
                    }}
                  />
                )}
              </div>
            </div>
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={userData.deliveries ? userData.deliveries.length : 0}
                onChange={handlePageChange}
              />
            </div>
            <div className="go-back-button">
              <Button
                onClick={handleGoBack}
                className="back-btn"
                type="primary"
                style={{
                  backgroundColor: "#F54040",
                }}
                danger
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Profile Image">
            <div>
              <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="preview-container">
              {previewImage && <img src={previewImage} alt="Profile Thumbnail" />}
            </div>
          </Form.Item>
          <Form.Item
            label="Username"
            rules={[
              {
                required: true,
                message: "Username is required",
              },
              {
                min: 5,
                message: "Username must be at least 5 characters long",
              },
            ]}
          >
            <Input
              name="username"
              value={updatedUserData.username}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input
              name="fullname"
              value={updatedUserData.fullname}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              name="password"
              value={updatedUserData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <div>
            <Button
              className="primary-btn"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button
              className="clear-cart-button"
              style={{ color: "white" }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default UserProfile;
