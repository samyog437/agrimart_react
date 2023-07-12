import { useEffect, useState } from "react";
import profilethumb from "../assets/images/profile-user.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";
import ProductCard from "../components/ProductCard";
import { FormOutlined } from "@ant-design/icons";

const UserProfile = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];
  const [userData, setUserData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    fullname: "",
    password: "",
  });
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
      const response = await axios.get(`/delivery`, config);
      setUserData((prevData) => {
        return { ...prevData, deliveries: response.data.deliveries };
      });
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
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `/user/${path}`,
        updatedUserData,
        config
      );
      setUserData(response.data.data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-center">
        <h3>Profile Details</h3>
        {userData && (
          <div className="user-info">
            <div className="user-info-data">
              <div className="profile-img">
                <img
                  src={publicFolder + userData.image}
                  alt="Profile"
                />
              </div>
              {!editMode && (
                <>
                  <p className="user-info-username">{userData.username}</p>
                  <FormOutlined className="edit-outline" onClick={handleEdit} />
                  <p>Full Name: {userData.fullname}</p>
                  <p>Email: {userData.email}</p>
                </>
              )}
              {editMode && (
                <Form onFinish={handleSubmit} layout="vertical">
                  <Form.Item label="Username">
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
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: "10px" }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </div>
                </Form>
              )}
            </div>
            <h3>My Orders</h3>
            <div className="cart-content order-content">
              <div className="cart-body order-body">
                {userData.deliveries && userData.deliveries.length > 0 ? (
                  userData.deliveries.map((delivery) => (
                    <div className="cart-list" key={delivery._id}>
                      <div className="order-item-parent">
                        {delivery.products.map((product, index) => (
                          <>
                            <div
                              className="cart-item order-item"
                              key={product._id}
                            >
                              <div className="cart-item-left order-item-left">
                                <img
                                  className="product-image"
                                  src={publicFolder + product.productId.image}
                                  alt="product"
                                  style={{
                                    width: "100px",
                                    height: "70px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="cart-name">
                                  {product.productId.title}
                                </div>
                              </div>
                            </div>
                            {index !== delivery.products.length - 1 && (
                              <hr />
                            )}
                          </>
                        ))}
                      </div>
                      <div className="order-item-parent">
                        {delivery.products.map((product) => (
                          <div className="cart-item" key={product._id}>
                            <div className="cart-item-right order-item-right">
                              Rs.{product.productId.price}
                            </div>
                          </div>
                        ))}

                        <div className="total-price">
                          Total Price: Rs.{delivery.totalPrice}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No deliveries found.</p>
                )}
              </div>
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
    </>
  );
};

export default UserProfile;
