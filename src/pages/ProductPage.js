import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    Spin,
    Avatar,
    Tooltip,
    Button,
    Col,
    Input,
    Space,
    Popconfirm,
    Rate,
    Empty,
  } from "antd";
import {
  MinusOutlined, PlusOutlined, StarOutlined,
} from "@ant-design/icons"
import ProductCard from "../components/ProductCard";
import thumb from "../assets/images/thumbnail.jpg";
import Review from "../components/Review";


const ProductPage = (props) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const publicFolder = "http://localhost:5000/image/"
    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [reviewPopupVisible, setReviewPopupVisible] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get("/products/"+ path);
            console.log("Current Product:", res["data"]);
            setProduct(res["data"]);
            setReviews(res["data"].reviews);
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

    const handleBuyNow = () => {
      navigate(`/products/${product._id}/delivery?quantity=${quantity}`)
    }

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
            <div className="product-container">
              <div className="blog-page">
                <div className="blog-top">
                  <div className="product-image-container">
                    <img
                      src={product.image ? publicFolder + product.image : thumb}
                      alt=""
                      className="product-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", /* Ensures the image fills the container without distortion */
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
                    <button className="rate-btn" onClick={() => setReviewPopupVisible(true)}>Rate <StarOutlined style={{color:'white'}} /></button>
                    <div className="btn-group shop">
                      <button onClick={handleBuyNow}>Buy Now</button>
                      <button>Add to Cart</button>
                    </div>
                  </div>
                  
                </div>
                <div className="blog-bottom">
                  <div className="blog-title-other">Reviews</div>
                  <div className="reviews-section">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div className="review_container" key={review._id}>
                          <div className="review_star">
                            <div className="review_name">{review.reviewerName}</div>
                            <div>
                              <Rate allowHalf disabled value={review.rating} style={{ color: "#F49723" }} />
                            </div>
                          </div>
                          <div className="review_body">{review.body}</div>
                        </div>
                      ))
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={<span style={{ color: '#888', fontWeight: 'bold', fontSize: '18px' }}>No reviews available</span>}
                        style={{
                          margin: '20px 0',
                        }}
                      />
                    )}
                  </div>
                  <div className="blog-title-other">Other Products</div>
                    <div className="other-products-container">
                      {products.slice(0, 3).map((ind_blog) => (
                        <Col key={ind_blog._id} style={{ marginTop: "20px" }}>
                          <ProductCard data={ind_blog} key={ind_blog._id} />
                        </Col>
                      ))}
                    </div>
                </div>
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
          <Review visible={reviewPopupVisible} onCancel={() => setReviewPopupVisible(false)} token={token} />
        </>
      );
}

export default ProductPage;