import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataHandler from "../handlers/DataHandler";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    DataHandler.clearSession();
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
