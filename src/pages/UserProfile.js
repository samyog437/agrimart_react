import { useEffect, useState } from "react";
import profilethumb from "../assets/images/profile-user.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import ProductCard from "../components/ProductCard";

const UserProfile = (props) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [userData, setUserData] = useState();
    const token = localStorage.getItem('token');

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

    return (
        <>
            <div className="text-center">
                <h1>Profile Page</h1>
                <div className="profile-img">
                    <img src={profilethumb} alt="Profile" />
                </div>
                {userData && (
                <div className="user-info">
                    <p>{userData.username}</p>
                    <p>Full Name: {userData.fullname}</p>
                    <p>Email: {userData.email}</p>
                    <h2>My Orders</h2>
                    <div className="cart-content">
                        <div className="cart-body">

                        </div>
                    </div>
                    {userData.deliveries && userData.deliveries.length > 0 ? (
                        userData.deliveries.map(delivery => (
                            <div className="cart-list" key={delivery._id}>
                                
                                    {delivery.products.map(product => (
                                        <>
                                            <div className="cart-item-left">
                                                <div key={product._id}>
                                                    {product.productId.title}
                                                </div>
                                            </div>
                                            <div className="cart-item-right">
                                                {/* <div key={product._id}>
                                                    {product.productId}
                                                </div> */}
                                            </div>
                                        </>
                                    ))}
                            </div>
                        ))
                    ) : (
                        <p>No deliveries found.</p>
                    )}
                </div>
                )}
            </div>
        </>
    )
}

export default UserProfile;
