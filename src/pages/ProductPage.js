import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import {
    Spin,
    Avatar,
    Tooltip,
    Button,
    Col,
    Input,
    Space,
    Popconfirm,
  } from "antd";
import {
  MinusOutlined, PlusOutlined, StarOutlined,
} from "@ant-design/icons"
import ProductCard from "../components/ProductCard";
import thumb from "../assets/images/thumbnail.jpg";


const ProductPage = (props) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const publicFolder = "http://localhost:5000/uploads/"
    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get("/products/"+ path);
            console.log("Current Product:", res["data"]);
            setProduct(res["data"]);
        };
        getProduct();

        const getProducts = async () => {
            const res = await axios.get("/products/");
            const new_products = res["data"]
            const filtered_products = new_products.filter(
                (new_products) => new_products._id !== product?._id
            );
            setProducts(filtered_products);
        };
        getProducts();
    }, [path, product?._id]);

    const increaseQuantity = () => {
      setQuantity(quantity+1);
    };

    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity-1);
      }
    };

    return (
        <>
          {product ? (
            <div className="blog-page">
              <div className="blog-top">
                <div style={{ width: "40%", height: "350px", marginTop: "40px" }}>
                  <img
                    src={product.image ? publicFolder + product.image : thumb}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: "12px",
                    }}
                  />
                </div>
                <div className="product-desc">
                  <div
                    className="flex-row"
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                  >
                    <div className="blog-title">{product.title}</div>
                  </div>  

                  <div className="blog-content">{`Rs. ${product.price}/kg`}</div>
                  <div className="increment-row">
                    <span className="qty">QTY</span>
                    <div className="increment-btn">
                      <MinusOutlined onClick={decreaseQuantity} />
                      <span>{quantity}</span>
                      <PlusOutlined onClick={increaseQuantity} />
                    </div>
                  </div>
                  <button className="rate-btn">Rate <StarOutlined style={{color:'white'}} /></button>
                  <div className="btn-group shop">
                    <button>Buy Now</button>
                    <button>Add to Cart</button>
                  </div>
                </div>
                
              </div>
              <div className="blog-bottom">
                <div className="blog-title-other">Other Products</div>
    
                {products.slice(0, 3).map((ind_blog) => (
                  <Col key={ind_blog._id} style={{ marginTop: "20px" }}>
                    <ProductCard data={ind_blog} key={ind_blog._id} />
                  </Col>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Spin size="large" />
            </div>
          )}
        </>
      );
}

export default ProductPage;