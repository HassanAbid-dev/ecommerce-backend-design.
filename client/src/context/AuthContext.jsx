import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axiosInstance from "../api/axiosInstance";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userAuthenticated = async () => {
      try {
        const response = await axiosInstance.get("/users/me");
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    userAuthenticated();
  }, []);
  const register = async (username, email, password) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in user:", error);
      setLoading(false);
      // ✅ Extract a readable message and throw it so Login.jsx can catch it
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(errorMessage);
    }
  };
  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
