import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/register", {
        user: { userName, email, password },
      })
      .then((res) => {
        if ((res.data = "exist")) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  // console.log(user)
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">User Name:</label>
          <input
            id="name"
            type="text"
            placeholder="display name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          You do have Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
