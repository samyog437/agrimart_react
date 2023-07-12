import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import thumb from "../assets/images/thumbnail.jpg";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const publicFolder = "http://localhost:5000/image/"
  const navigate = useNavigate();

  const handleCheckout = () => {
    const queryParams = cartItems.map((item) => `quantity=${item.quantity}`);
    const totalPrice = calculateTotal();
    queryParams.push(`total=${totalPrice}`)
    navigate(`/delivery?${queryParams.join("&")}`);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // Calculate the total of the cart
  const calculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

  return (
    <div className="text-center">
      <h1 style={{ marginTop: "2rem" }}>My Cart</h1>
      <div className="cart-content">
        <div className="cart-body">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((product) => (
                <div className="cart-list" key={product.id}>
                  <div className="cart-item-left">
                  <img
                      src={publicFolder + product.image}
                      alt=""
                      className="product-image"
                      style={{
                        width: "100px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="cart-name">{product.name}</div>
                  </div>
                  <div className="cart-item-right">
                  <div className="cart-price">{product.quantity} kg</div>
                    <div className="cart-price">Rs.{product.price}</div>
                    <DeleteOutlined
                      style={{ fontSize: "24px", color: "#BB271A" }}
                      onClick={() => removeFromCart(product.id)}
                    />
                  </div>
                </div>
              ))}
              <div className="cart-total">Total: Rs.{calculateTotal()}</div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          {cartItems.length > 0 && (
            <>
              <button className="clear-cart-button" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
