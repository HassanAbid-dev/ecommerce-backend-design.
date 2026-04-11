import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";

const Admin = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // protect the page — if not admin, redirect after render
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // don't render the form until user is loaded and confirmed to be admin
  if (loading) {
    return null; // wait for user data to load
  }

  if (!user || user.role !== "admin") {
    return null; // not admin, useEffect will redirect shortly
  }

  const onSubmit = async (data) => {
    try {
      // data contains: name, description, price, imageUrl, category, stock
      // price and stock come as strings from inputs, convert to numbers
      await axiosInstance.post("/products/create-product", {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      });
      alert("Product created successfully!");
      reset(); // clears the form
    } catch (err) {
      alert("Error creating product — are you logged in as admin?");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#1C1C1C] mb-2">
              Add New Product
            </h1>
            <p className="text-[#8B96A5]">
              Create and manage products in your store
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#1C1C1C] mb-2">
                  Product Name *
                </label>
                <input
                  {...register("name", { required: true })}
                  placeholder="e.g., iPhone 15 Pro"
                  className="px-4 py-3 border border-[#DEE2E7] rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[#1C1C1C]"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#1C1C1C] mb-2">
                  Description *
                </label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Describe your product..."
                  rows="4"
                  className="px-4 py-3 border border-[#DEE2E7] rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[#1C1C1C] resize-none"
                />
              </div>

              {/* Price & Stock Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#1C1C1C] mb-2">
                    Price (USD) *
                  </label>
                  <input
                    {...register("price", { required: true })}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    className="px-4 py-3 border border-[#DEE2E7] rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[#1C1C1C]"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#1C1C1C] mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    {...register("stock", { required: true })}
                    placeholder="0"
                    type="number"
                    className="px-4 py-3 border border-[#DEE2E7] rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[#1C1C1C]"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#1C1C1C] mb-2">
                  Image URL *
                </label>
                <input
                  {...register("imageUrl", { required: true })}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  className="px-4 py-3 border border-[#DEE2E7] rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[#1C1C1C]"
                />
                <p className="text-xs text-[#8B96A5] mt-1">
                  Paste a direct URL to your product image
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#1C1C1C] mb-2">
                  Category *
                </label>
                <input
                  {...register("category", { required: true })}
                  placeholder="e.g., Smartphones, Laptops, Audio"
                  className="px-4 py-3 border border-[#DEE2E7] rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[#1C1C1C]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark active:scale-95 text-black-400 font-bold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  ✓ Create Product
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-8 bg-white border-2 border-[#DEE2E7] text-[#505050] font-medium py-4 rounded-lg hover:bg-[#F7F7F7] hover:border-[#1C1C1C] transition-all"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-[#E3F0FF] border border-primary/20 rounded-lg p-6">
            <h3 className="font-bold text-[#1C1C1C] mb-2">
              💡 Tips for adding products:
            </h3>
            <ul className="text-sm text-[#505050] space-y-2">
              <li>✓ Use clear, descriptive product names</li>
              <li>✓ Add detailed descriptions to improve visibility</li>
              <li>✓ Use direct image URLs (Unsplash, Pexels recommended)</li>
              <li>✓ Set accurate prices and stock quantities</li>
              <li>✓ Use consistent category names</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
