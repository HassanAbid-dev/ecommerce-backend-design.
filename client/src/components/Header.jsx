import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
          <Link to="/" className="flex items-center">
            <img
              src="data:image/jpeg;base64,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"
              className="mr-3 h-12"
              alt="Logo"
            />
            <span className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
              Ecommerce
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              {user ? <span>Welcome, {user.name}!</span> : "Log in"}
            </Link>
            <Link
              to="/login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              {user && user.role === "admin" ? (
                <span>Welcome, {user.name}!</span>
              ) : (
                "Log in"
              )}
            </Link>
            <Link
              to="/checkout"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              <div className="cart-icon">
                🛒
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </div>
            </Link>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b 0 ${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="products"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b 0 ${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
