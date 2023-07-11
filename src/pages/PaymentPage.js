import axios from "axios";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../components/CartContext";

const PaymentPage = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const token = localStorage.getItem('token');
    const deliveryData = JSON.parse(sessionStorage.getItem("deliveryData"))
    
    const config = { headers: {Authorization: `Bearer ${token}`} }

    const handleOrder = async () => {
        try {
          await axios.post(`/delivery`, deliveryData, config);
          sessionStorage.removeItem("productId");
          sessionStorage.removeItem("deliveryData");
          alert("Order placed successfully");
        } catch (error) {
          console.log("Error placing order:", error);
          sessionStorage.removeItem("productId");
          sessionStorage.removeItem("deliveryData");
          alert("Failed to place order"); 
        }
      };
      
    return (
        <>
            <div className="text-center">
                <h2>Payment Method</h2>
                <div className="btn-group">
                    <button onClick={handleOrder}>Cash on Delivery</button>
                    <h5>or</h5>
                    <button>Khalti</button>
                </div>
            </div>
        </>
    )
}

export default PaymentPage;