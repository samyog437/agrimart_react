import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination } from "antd";
import ProductCard from "../components/ProductCard";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const AllVegetables = () => {
  const[products, setProducts] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");
  const[currentPage, setCurrentPage] = useState(1);
  const[productsPerPage] = useState(9);
  const location = useLocation();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("products");
      console.log(res["data"])
      setProducts(res["data"])
    };
    getProducts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    setSearchTerm(searchQuery || "");
  }, [location.search]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (page) => setCurrentPage(page);

  const filteredProducts = currentProducts.filter((product) => {
    const productName = product.title.toLowerCase();
    const searchTerms = searchTerm.toLowerCase();
    return productName.includes(searchTerms);
  });

  
  
  return (
    <>
      <div className="text-center">
        <h1>All Vegetables</h1>
          <div className="search-container">
            <div className="center-container">
              <Search
                enterButton
                suffix={<SearchOutlined style={{ color: "#333333" }} />}
                className="custom-search"
                value={searchTerm}
                onChange={handleSearch} 
              />
            </div>
          </div>
          <Row className="card-row"gutter={[16,24]} >
            {filteredProducts.map((product) => (
              <Col span={4} className="card-col" key={product._id}>
                <ProductCard data={product}/>
              </Col>
            ))}
          </Row>
          <Pagination
        current={currentPage}
        pageSize={productsPerPage}
        total={filteredProducts.length}
        onChange={handleChangePage}
        style={{ margin: "2rem 0rem", textAlign: "center" }}
      />
      </div>
    </>
  );
};

export default AllVegetables;