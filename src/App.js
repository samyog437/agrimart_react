import { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from "../src/components/Header";
import Login from './pages/Login';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Header/>
      <Container style={{minHeight: "100vh"}}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Container>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
