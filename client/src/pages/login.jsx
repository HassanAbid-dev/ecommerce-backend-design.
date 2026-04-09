import React from "react";
import { useform } from "react-hook-form";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext.js";

const login = () => {
  const { login } = useAuth();

  return (
    <div>
      <div className="container"></div>
    </div>
  );
};

export default login;
