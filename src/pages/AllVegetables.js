import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination } from "antd";
import ProductCard from "../components/ProductCard";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";

const AllVegetables = () => {
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
      <div className="text-center">
        <h1>All Vegetables</h1>
          <div className="search-container"> {/* Wrap the search bar in a container */}
            <div className="center-container"> {/* Centering container */}
              <Search
                enterButton
                suffix={<SearchOutlined style={{ color: "#333333" }} />}
                className="custom-search" // Add custom class name
              />
            </div>
          </div>
          <Row className="card-row"gutter={[16,24]} >
            {products.map((product) => (
              <Col span={4} className="card-col" key={product._id}>
                <ProductCard data={product}/>
              </Col>
            ))}
          </Row>
      </div>
    </>
  );
};

export default AllVegetables;