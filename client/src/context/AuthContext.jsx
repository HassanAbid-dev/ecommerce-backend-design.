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
  const register = async (name, email, password) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error registering user:", error);
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
    } catch (error) {
      console.error("Error logging in user:", error);
      setLoading(false);
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
