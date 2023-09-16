import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      <div>
        <div className="makebtn login">
          <Link to="/login" className="link">Login</Link>
        </div>
        <div className="makebtn register">
          <Link to="/register" className="link">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
