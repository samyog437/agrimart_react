import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination } from "antd";
import ProductCard from "../components/ProductCard";
import searchBG from "../assets/images/search-bg.jpg"
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const[products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("products");
      console.log(res["data"])
      setProducts(res["data"])
    };
    getProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    navigate(`/products?search=${searchTerm}`)
  }

  const recentlyAddedProducts = products
        .slice()
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0,3);
  const mostPopularProducts = products
        .slice()
        .sort((a,b) => b.purchaseCount - a.purchaseCount)
        .slice(0,3);
  
  return (
    <>
      <Row className="search-row" gutter={[16, 16]} style={{margin:0}} >
        <Col className="img-col" span={24}>
          <div className="searchImg-container" style={
            {
               backgroundImage: `url(${searchBG})`, 
               backgroundSize: 'cover' 
               }} >
                <Search enterButton className="dash-search" onSearch={handleSearch} />
          </div>
        </Col>
      </Row>
      <div className="text-center">
        <h2>Recently Added</h2>
          <Row className="card-row" gutter={[16,24]} style={{margin:0}} >
          {recentlyAddedProducts.map((product) => (
            <Col className="card-col" span={4} key={product._id}>
              <ProductCard data={product}/>
            </Col>
          ))}
        </Row>
        <h2>Most Popular</h2>
          <Row className="card-row" gutter={[16,24]} style={{margin:0}} >
          {mostPopularProducts.map((product) => (
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