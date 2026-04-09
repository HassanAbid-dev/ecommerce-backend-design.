import { Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
