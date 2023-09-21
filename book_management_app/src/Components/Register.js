import React, { useState } from "react";
import APIService from "../services/APIService";
import { useForm } from "react-hook-form";

const defaultValues = {
  user_name: "",
  email: "",
  password: "",
};
const Register = () => {
  //const navigate = useNavigate();
  const { handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function OnSubmit() {
    APIService({
      url: `${process.env.REACT_APP_API}/user/register`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        setFormData({
          user_name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Register</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="user_name"
                name="user_name"
                placeholder="Enter your username"
                value={formData.user_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
