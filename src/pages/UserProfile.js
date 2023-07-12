import { useEffect, useState } from "react";
import profilethumb from "../assets/images/profile-user.png";
import axios from "axios";

const UserProfile = (props) => {
    const publicFolder = "http://localhost:5000/image/";
    const [userData, setUserData] = useState(null);
    const[orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`/user/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error(`Error fetching user data:`, error)
            }
        };
        const fetchOrderData = async () => {
            try {
              const userId = localStorage.getItem('userId');
              const response = await axios.get(`/orders/${userId}`);
              setOrderData(response.data);
            } catch (error) {
              console.error('Error fetching order data:', error);
            }
        };

        fetchUserData();
        fetchOrderData();
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
                </div>
        )}
        {orderData.length > 0 && (
          <div className="order-info">
            <h2>Orders:</h2>
            <ul>
              {orderData.map((order) => (
                <li key={order.orderId}>
                  Order ID: {order.orderId} - Total Amount: {order.totalAmount}
                </li>
              ))}
            </ul>
          </div>
        )}
            </div>
        </>
    )
}

export default UserProfile;