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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <section className="relative h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -top-40 right-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-blue-300 bg-blue-900 bg-opacity-50 border border-blue-700">
              ✨ Premium E-Commerce Experience
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ShopHub
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover an extraordinary collection of premium products curated
            just for you. Experience seamless shopping with confidence and
            style.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <button
              className="group px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
              onClick={() => navigate("/products")}
            >
              🛍️ Shop Now
            </button>
            <button className="group px-8 py-4 border-2 border-blue-400 text-blue-300 rounded-lg font-bold text-lg hover:bg-blue-400 hover:text-slate-900 transition duration-300 backdrop-blur-sm transform hover:scale-105">
              📚 Learn More
            </button>
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="backdrop-blur-md bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-xl p-4 transform hover:scale-110 transition duration-300">
              <span className="text-3xl mb-2 block">🚀</span>
              <p className="text-blue-100 font-semibold">Fast Delivery</p>
            </div>
            <div className="backdrop-blur-md bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-xl p-4 transform hover:scale-110 transition duration-300">
              <span className="text-3xl mb-2 block">🔒</span>
              <p className="text-blue-100 font-semibold">Secure Payment</p>
            </div>
            <div className="backdrop-blur-md bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-xl p-4 transform hover:scale-110 transition duration-300">
              <span className="text-3xl mb-2 block">💯</span>
              <p className="text-blue-100 font-semibold">Best Prices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold text-blue-600 bg-blue-100 mb-4">
              CURATED COLLECTION
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked items that define quality and style. Discover what's
              trending.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    </>
                  ) : (
                    <div className="text-center">
                      <span className="text-5xl mb-2">📦</span>
                      <p className="text-gray-400 text-sm">Product Image</p>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Popular
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="mb-3">
                    <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-5">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      (128 reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        ${product.price}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-semibold">
                        In Stock
                      </p>
                      <p className="text-sm text-green-600 font-bold">
                        Available
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
            </div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-white bg-opacity-20 text-white mb-6 backdrop-blur-sm">
                🎉 LIMITED TIME OFFER
              </span>
              <h3 className="text-5xl md:text-6xl font-black mb-6">
                Special Offers Await You
              </h3>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Get exclusive discounts up to 40% off and early access to new
                collections. Don't miss out!
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                🚀 Explore All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience shopping like never before with our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-4">🚀</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Express Shipping
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Get your orders delivered in lightning-fast time to your
                doorstep
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-4">🔒</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Secure Payment
              </h4>
              <p className="text-gray-600 leading-relaxed">
                All transactions are encrypted and protected with
                industry-leading security
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-4">💯</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Best Prices
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Price match guarantee and exclusive deals for our loyal
                customers
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-4">⭐</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Trusted Reviews
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Read authentic customer reviews and make informed purchase
                decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold text-blue-300 bg-blue-700 bg-opacity-50 mb-4">
            📧 STAY CONNECTED
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-lg text-blue-100 mb-10 leading-relaxed">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            insider deals!
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-500"
            />
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            ✓ No spam, just great deals. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Shop?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our full catalog and find exactly what you're looking for
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:scale-105"
          >
            ✨ Explore All Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
