import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
  stock: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/products/getAllProducts");
      setProducts(data.products || []);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock,
    });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleSubmit = async () => {
    // basic validation
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.imageUrl ||
      !form.category ||
      !form.stock
    ) {
      setFormError("All fields are required.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      if (editingProduct) {
        // UPDATE
        const { data } = await axiosInstance.put(
          `/products/update/${editingProduct._id}`,
          { ...form, price: Number(form.price), stock: Number(form.stock) },
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? data : p)),
        );
      } else {
        // CREATE
        const { data } = await axiosInstance.post("/products/create-product", {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
        setProducts((prev) => [data, ...prev]);
      }
      closeForm();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setDeletingId(productId);
    try {
      await axiosInstance.delete(`/products/delete/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              Admin — Products
            </h1>
            <p className="text-gray-600">{products.length} total products</p>
          </div>
          <button
            onClick={openAddForm}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            + Add product
          </button>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingProduct ? "Edit product" : "Add new product"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="iPhone 15 Pro"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Electronics"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="999"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {formError && (
              <p className="mt-3 text-sm text-red-600">{formError}</p>
            )}

            {/* Preview image if URL is entered */}
            {form.imageUrl && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Image preview:</p>
                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitting
                  ? "Saving..."
                  : editingProduct
                    ? "Save changes"
                    : "Add product"}
              </button>
              <button
                onClick={closeForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products list */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              No products yet. Add your first one!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-6 items-center">
                  {/* Image */}
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                      {product.description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditForm(product)}
                      className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition font-medium disabled:opacity-50"
                    >
                      {deletingId === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
