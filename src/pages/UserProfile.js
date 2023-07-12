import { useEffect, useState } from "react";
import profilethumb from "../assets/images/profile-user.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "antd";
import ProductCard from "../components/ProductCard";

const UserProfile = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/")[2];
    const [userData, setUserData] = useState();
    const token = localStorage.getItem('token');
    const publicFolder = "http://localhost:5000/image/"

    const config = { headers: {Authorization: `Bearer ${token}`} }

    useEffect(() => {
        const fetchUserData = async() => {
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
    }

    return (
        <>
            <div className="text-center">
                <h3>Profile Details</h3>
                <div className="profile-img">
                    <img src={profilethumb} alt="Profile" />
                </div>
                {userData && (
                <div className="user-info">
                    <div className="user-info-data">
                        <p className="user-info-username">{userData.username}</p>
                        <p>Full Name: {userData.fullname}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                    <h3>My Orders</h3>
                    <div className="cart-content order-content">
                        <div className="cart-body order-body">
                        {userData.deliveries && userData.deliveries.length > 0 ? (
                        userData.deliveries.map(delivery => (
                            <div className="cart-list" key={delivery._id}>
                                <div className="order-item-parent">
                                    {delivery.products.map((product, index) => (
                                        <>
                                        <div className="cart-item order-item" key={product._id}>
                                            <div className="cart-item-left order-item-left">             
                                                <img 
                                                className="product-image"
                                                src={publicFolder + product.productId.image} alt="product" style={{
                                                width: "100px",
                                                height: "70px",
                                                objectFit: "cover",
                                                 }} />
                                                <div className="cart-name">                                            
                                                    {product.productId.title}
                                                </div>
                                            </div>
                                        </div>
                                        {index !== (delivery.products.length - 1) && <hr/>}
                                        </>
                                        
                                    ))}
                                </div>
                                    <div className="order-item-parent">
                                        {delivery.products.map(product => (
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
                        <Button onClick={handleGoBack} className="back-btn" type="primary" style={{
                            backgroundColor: "#F54040"
                        }} danger>
                            Go Back
                        </Button>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}

export default UserProfile;
