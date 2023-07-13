import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Pagination, Select } from "antd";
import ProductCard from "../components/ProductCard";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const {Option} = Select;

const AllVegetables = () => {
  const[products, setProducts] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");
  const[currentPage, setCurrentPage] = useState(1);
  const[productsPerPage] = useState(9);
  const [sortOption, setSortOption] = useState("");
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
    const filterQuery = searchParams.get('filter');
    setSearchTerm(searchQuery || "");
    setSortOption(filterQuery)
  }, [location.search]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSortChange = (value) => {
    setSortOption(value);
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

  let sortedProducts = [...filteredProducts];
  if (sortOption === "purchaseCount") {
    sortedProducts.sort((a,b) => b.purchaseCount - a.purchaseCount);
  } else if (sortOption === "uploadDate") {
    sortedProducts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const rows = [];
  for (let i = 0; i < sortedProducts.length; i += 3) {
    const rowProducts = sortedProducts.slice(i, i + 3);
    rows.push(rowProducts);
  }
  
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
          <div className="sort-class-parent">
            <div className="sort-class">
                <Select 
                    value={sortOption} 
                    style={{width: 150, marginLeft: 10}}
                    onChange={handleSortChange}
                    >
                      <Option value="">Sort By</Option>
                      <Option value="purchaseCount">Popularity</Option>
                      <Option value="uploadDate">Upload Date</Option>
                  </Select>
              </div>
          </div>
          <div className="card-row-parent">
          {rows.map((row, rowIndex) => (
            <Row className="card-row" gutter={[16, 24]} key={rowIndex}>
              {row.map((product) => (
                <Col span={4} className="card-col all-card" key={product._id}>
                  <ProductCard data={product} />
                </Col>
              ))}
            </Row>
          ))}
          </div>  
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