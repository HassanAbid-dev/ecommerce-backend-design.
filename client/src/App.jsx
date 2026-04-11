import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
// import Products from "./pages/Products.jsx"; // you'll create this
import Products from "./pages/Products.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Admin from "./pages/Admin.jsx"; // you'll create this
import Profile from "./pages/Profile.jsx";
import Messages from "./pages/Messages.jsx";
import Orders from "./pages/Orders.jsx";
import Cart from "./pages/Cart.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      {/* :id means dynamic — /products/abc123, /products/xyz456 all match this */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
