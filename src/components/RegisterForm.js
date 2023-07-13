import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const [previewImage, setPreviewImage] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(imageFile);
  };

  const onSubmit = async () => {
    const errors = [];

    if (!username) {
      errors.push("Username is required");
    } else if (username.length < 5) {
      errors.push("Username must be at least 5 characters long");
    }

    if (!password) {
      errors.push("Password is required");
    }

    if (!email) {
      errors.push("Email is required");
    }

    if (!fullname) {
      errors.push("Full name is required");
    }

    if (errors.length > 0) {
      toast.error(errors.join(", "));
      return;
    }

    const user = {
      username,
      email,
      fullname,
      password,
      image,
    };
    await axios
      .post("/user/", user)
      .then(() => {
        toast.success("User Registered Successfully");
        setTimeout(() => {
          window.location.replace("/login");
        }, 500);
      })
      .catch((e) => {
        toast.error(`Registration Failed! ${e["response"]["data"]["msg"]}`);
      });
  };

  return (
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required="required"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="fullname"
            id="fullname"
            name="fullname"
            required="required"
            value={fullname}
            onChange={handleFullnameChange}
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
          <label htmlFor="image-upload">Profile Picture</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="preview-container">
            {previewImage && <img src={previewImage} alt="Blog Thumbnail" />}
          </div>
        </div>
        <div className="btn-group">
          <button onClick={onSubmit} className="primary-btn">Register</button>
          <h5>or</h5>
          <Link to="/login">
            <button className="register-button">Login</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default RegisterForm;