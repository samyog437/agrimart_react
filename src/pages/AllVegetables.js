import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination } from "antd";
import ProductCard from "../components/ProductCard";

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
      </div>
      <Row gutter={[300,300]}>
        {products.map((product) => (
          <Col span={8} key={product._id}>
            <ProductCard data={product}/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllVegetables;