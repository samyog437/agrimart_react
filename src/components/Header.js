import { Link } from "react-router-dom";
import { Space } from "antd";
import { Nav, Navbar } from "react-bootstrap";

const Header = (props) => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ padding: "10px 40px", backgroundColor: "#ad5389" }}
      className="navigation-bar"
    >
      <Link to={"/"} className="no-link">
        <div className="navbar-logo">AgriMart</div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="no-link" style={{ marginRight: "20px" }}>
            All Vegetables
          </Link>
          <Link to="/login" className="no-link">
            Login
          </Link>
          <Link to="/register" className="no-link">
            Register
          </Link>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
