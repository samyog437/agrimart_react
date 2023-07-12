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

                    {userData.deliveries && userData.deliveries.length > 0 ? (
                        userData.deliveries.map(delivery => (
                            <div key={delivery._id}>
                                <h4>Products:</h4>
                                <ul>
                                    {delivery.products.map(product => (
                                        <li key={product._id}>{product.productId.title}</li>
                                    ))}
                                </ul>
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
