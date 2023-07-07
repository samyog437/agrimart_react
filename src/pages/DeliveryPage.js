import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const DeliveryPage = () => {
    const location = useLocation()
    const [city, setCity] = useState('')
    const [area, setArea] = useState('')
    const [landmark, setLandmark]= useState('')
    const [contact, setContact] = useState('')
    const path = location.pathname.split("/")[2];
    const token = localStorage.getItem('token');

    const config = { headers: {Authorization: `Bearer ${token}`} }

    const handleCityChange = (e) => {
      setCity(e.target.value);
    };
  
    const handleAreaChange = (e) => {
      setArea(e.target.value);
    };
  
    const handleLandmarkChange = (e) => {
      setLandmark(e.target.value);
    };
  
    const handleContactChange = (e) => {
      setContact(e.target.value);
    };

    const handleDeliverySubmit = async () => {
      const deliveryData = {
        city,
        area,
        landmark,
        contactNo: parseInt(contact),
      };
      console.log(deliveryData)
      try {
        await axios.post(`/products/${path}/delivery/`, deliveryData, config);
        alert("Product ordered successfully");
      } catch (error) {
        console.log(`the path is ${path}`)
        console.log(`the path is ${token}`)
        console.log(error);
      }
    };

    return (
        <>
        <div className="text-center">
      <h2>Delivery Address</h2>
      <div className="user-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              required="required"
              value={city}
              onChange={handleCityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Area</label>
            <input
              type="text"
              id="area"
              name="area"
              required="required"
              value={area}
              onChange={handleAreaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              required="required"
              value={landmark}
              onChange={handleLandmarkChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact no.</label>
            <input
              type="text"
              id="contact"
              name="contact"
              required="required"
              value={contact}
              onChange={handleContactChange}
            />
          </div>
          <div className="btn-group">
              <button className="deliver" onClick={handleDeliverySubmit} >Proceed to Pay</button>
            </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default DeliveryPage;