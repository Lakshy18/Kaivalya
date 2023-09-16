import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/user/login", {
        user: { userName, password },
      })
      .then((res) => {
        if ((res.data)) {
          navigate("/toDoList");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name:</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          <button type="submit">Login</button>
        </form>

        <p>
          You do'nt have Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
