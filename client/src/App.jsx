import { Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import { useState } from "react";

const App = () => {
  const [page, setPage] = useState("home");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home setPage={setPage} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
