import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>,
);
