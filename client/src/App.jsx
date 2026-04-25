import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Products from "./pages/Products.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import Register from "./pages/Register.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import Home from "./pages/Home.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserRoute from "./components/UserRoute.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Protected — logged in users only */}
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <UserRoute>
              <MyOrders />
            </UserRoute>
          }
        />

        {/* Protected — admin only */}
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
