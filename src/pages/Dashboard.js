import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination } from "antd";
import ProductCard from "../components/ProductCard";
import searchBG from "../assets/images/search-bg.jpg"
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const[products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("products");
      console.log(res["data"])
      setProducts(res["data"])
    };
    getProducts();
  }, []);
  
  return (
    <>
      <Row className="search-row" gutter={[16, 16]} style={{margin:0}} >
        <Col className="img-col" span={24}>
          <div className="searchImg-container" style={
            {
               backgroundImage: `url(${searchBG})`, 
               backgroundSize: 'cover' 
               }} >
                <Search enterButton className="dash-search" />
          </div>
        </Col>
      </Row>
      <div className="text-center">
        <h1>Recently Added</h1>
          <Row className="card-row" gutter={[16,24]} style={{margin:0}} >
          {products.map((product) => (
            <Col className="card-col" span={4} key={product._id}>
              <ProductCard data={product}/>
            </Col>
          ))}
        </Row>
        <h1>Most Popular</h1>
          <Row className="card-row" gutter={[16,24]} style={{margin:0}} >
          {products.map((product) => (
            <Col className="card-col" span={4} key={product._id}>
              <ProductCard data={product}/>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Dashboard;