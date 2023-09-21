import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
