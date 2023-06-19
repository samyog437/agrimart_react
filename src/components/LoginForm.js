import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    const user = {
      username,
      password,
    };

    await axios
      .post("/user/login", user)
      .then((res) => {
        localStorage.setItem("userId", res["data"]["userId"]);
        localStorage.setItem("token", res["data"]["token"]);
        window.location.replace("/");
      })
      .catch((e) => {
        toast.error(`Login Failed! ${e["response"]["data"]["msg"]}`);
      });
  };
  return (
    <>
      <div className="user-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required="required"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required="required"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <button onClick={onSubmit}>Log In</button>
          </div>
          <div className="form-group">
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default LoginForm;