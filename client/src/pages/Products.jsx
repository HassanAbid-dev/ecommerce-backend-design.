import axiosInstance from "../api/axiosInstance";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Products() {
  const navigate = useNavigate();
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/products/getAllProducts", {
          params: { limit: productsPerPage, page: currentPage },
        });
        setProducts(res.data.products);
      } catch (error) {
        console.log("ERROR:", error); // 👈 catch the actual error
      } finally {
        setLoading(false);
      }
    };
    fetchedProducts();
  }, [productsPerPage, currentPage]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Products Grid Section */}
      {loading && <div className="text-center py-16">Loading products...</div>}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No Image Available
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                    <span className="text-3xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No products found. Please try again later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">
                Items per page:
              </label>
              <select
                value={productsPerPage}
                onChange={(e) => {
                  setProductsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">
                  Page {currentPage}
                </span>
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
