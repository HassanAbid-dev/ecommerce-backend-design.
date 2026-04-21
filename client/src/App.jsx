import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Products from "./pages/Products.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import Register from "./pages/Register.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <Routes>
      {/* Pages WITH Header & Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />{" "}
        <Route path="/checkout" element={<Checkout />} />
        {/* 👈 add this */}
      </Route>

      {/* Pages WITHOUT Header & Footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
