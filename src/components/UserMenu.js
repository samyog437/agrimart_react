import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const UserMenu = (props) => {
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={`/user/${props.user._id}`}>
          <Button type="link">My Profile</Button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={`/cart`}>
          <Button type="link">My Cart</Button>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Button type="link" onClick={logout} danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <div onClick={(e) => e.preventDefault()}>
        <Space
          style={{
            color: "white",
            fontFamily: "Poppins",
            fontWeight: "600",
            textTransform: "uppercase",
            cursor:"pointer"
          }}
        >
          {props.user.username}
          <DownOutlined style={{fontSize:"0.9rem"}} />
        </Space>
      </div>
    </Dropdown>
  );
};

export default UserMenu;