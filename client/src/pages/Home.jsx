import React, { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchedProdicts = async () => {
      try {
        let fetchedProducts = await axiosInstance.get(
          "/products/getAllProducts",
          {
            params: { limit: 3, page: 1 },
          },
        );

        setProducts(fetchedProducts.data.products);
      } catch (error) {
        console.log("ERROR:", error); // 👈 catch the actual error
      }
    };
    fetchedProdicts();
  }, []);
  const [products, setProducts] = useState([]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover a curated collection of premium products handpicked just
            for you. Shop with confidence, style, and ease.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Check out our latest and most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Special Offers Await You
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Get exclusive discounts and early access to new collections
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Explore More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-white bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Shipping
              </h4>
              <p className="text-gray-600">
                Get your orders delivered quickly to your doorstep
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Payment
              </h4>
              <p className="text-gray-600">
                Safe and encrypted transactions for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Support 24/7
              </h4>
              <p className="text-gray-600">
                Our team is always ready to help you with any questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
