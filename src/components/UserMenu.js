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
            fontFamily: "Inter",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          <Avatar src="https://joesch.moe/api/v1/jacques" />
          {props.user.username}
        </Space>
      </div>
    </Dropdown>
  );
};

export default UserMenu;