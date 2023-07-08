import "react-toastify/dist/ReactToastify.css";
import './App.css';

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from "../src/components/Header";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AllVegetables from './pages/AllVegetables';
import ProductPage from "./pages/ProductPage";
import DeliveryPage from "./pages/DeliveryPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (userId == null) {
      console.log("Login to access various content");
    } else {
      const getUser = async () => {
        const res = await axios.get(`/user/${userId}`);
        console.log("Logged In User:", res["data"]);
        setUser(res["data"]);
      };
      getUser();
    }
  }, [userId]);

  return (
    <Fragment>
      <BrowserRouter>
      <Header user={user}/>
      <Container style={{minHeight: "100vh"}}>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/products" element={<AllVegetables/>}/>
          <Route path="/products/:products_id" element={<ProductPage/>} />
          <Route path="/products/:products_id/delivery" element={<DeliveryPage/>} />
          <Route path="/products/:products_id/delivery/payment" element={<PaymentPage/>} />
          <Route path="/login" element={userId ? <Dashboard/> : <Login/>}/>
          <Route path="/register" element={userId ? <Dashboard /> : <Register/>}/>
        </Routes>
      </Container>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
