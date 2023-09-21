import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataHandler from "../handlers/DataHandler";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
  });

  async function onSubmit() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    await fetch(`${process.env.REACT_APP_API}/user/login`, requestOptions)
      .then((response) =>
        response.json().then((res) => {
          if (!res.error) {
            DataHandler.setToSession("user_id", res.data.user_id);
            DataHandler.setToSession("user_name", res.data.user_name);
            DataHandler.setToSession("email", res.data.email);
            DataHandler.setToSession("accessToken", res.data.accessToken);
            navigate("/");
          } else {
          }
        })
      )
      .catch((errors) => {
        {
        }
      });
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
