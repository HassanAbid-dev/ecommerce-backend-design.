import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/getById/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Breadcrumb / Back Button */}
      <section className="pt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            ← Back to Products
          </button>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                <div className="h-96 md:h-full bg-gray-100 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-lg">
                      No Image Available
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-4 py-2 rounded-full uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating (Placeholder) */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  Price
                </p>
                <p className="text-5xl font-bold text-blue-600">
                  ${product.price ? product.price.toFixed(2) : "0.00"}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <p className="text-gray-600 text-sm font-semibold mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                    −
                  </button>
                  <input
                    type="number"
                    value="1"
                    className="w-16 h-10 border border-gray-300 rounded-lg text-center focus:outline-none focus:border-blue-600"
                    readOnly
                  />
                  <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-lg"
                >
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-lg">
                  ❤ Wishlist
                </button>
              </div>

              {/* Product Info Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Free Shipping
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🛡️</div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Easy Returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-12 px-4 md:px-8 bg-white bg-opacity-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Product Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">SKU</span>
                  <span className="text-gray-900 font-semibold">
                    {product._id?.substring(0, 8)}
                  </span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="text-gray-900 font-semibold">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">
                    Availability
                  </span>
                  <span className="text-green-600 font-semibold">In Stock</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping & Returns
              </h3>
              <p className="text-gray-700 mb-4">
                We offer free shipping on all orders over $50. Standard delivery
                takes 5-7 business days.
              </p>
              <p className="text-gray-700">
                Not satisfied? We offer hassle-free returns within 30 days of
                purchase. No questions asked!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-400">Related Product {i}</span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Related Item {i}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Similar product in our collection
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      $79.99
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
