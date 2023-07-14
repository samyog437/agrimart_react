import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import KhaltiCheckout from "khalti-checkout-web";
import khaltiConfig from "../components/Khalti/khaltiConfig";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "antd";

const PaymentPage = () => {
  const navigate = useNavigate();
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const token = localStorage.getItem('token');
    const deliveryData = JSON.parse(sessionStorage.getItem("deliveryData"))
    const userId = localStorage.getItem("userId");

    
    const config = { headers: {Authorization: `Bearer ${token}`} }

    const handleOrder = async () => {
        try {
          await axios.post(`/delivery`, deliveryData, config);
          sessionStorage.removeItem("productId");
          sessionStorage.removeItem("deliveryData");
          toast.success("Order placed successfully");
            setTimeout(() => {
             navigate(`/user/${userId}`);  
        }, 2000);
        } catch (error) {
          console.log("Error placing order:", error);
          sessionStorage.removeItem("productId");
          sessionStorage.removeItem("deliveryData");
          toast.error("Failed to place order"); 
        }
      };
    
    let checkout = new KhaltiCheckout(khaltiConfig);

    const handleGoBack = () => {
      navigate('/');
    }
      
    return (
        <>  
          <div className="text-center">
            <h3 className="page-title">Payment Method</h3>
            <div className="sort-class-parent">
              <div className="sort-class">
                <Button danger style={{width: "fit-content"}} onClick={handleGoBack}>
                      Go to Home
                </Button>
              </div>
            </div>
            <div className="payment-page-container">
                  <div className="btn-group">
                    <button onClick={handleOrder}>Cash on Delivery</button>
                    {/* <h5>or</h5>
                    <button onClick={() => checkout.show({ amount: 1000 })}>Khalti</button> */}
                </div>
              </div>
          </div>
            <ToastContainer/>
        </>
    )
}

export default PaymentPage;