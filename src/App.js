import { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from "../src/components/Header";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Header/>
      <Container style={{minHeight: "100vh"}}>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Container>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
