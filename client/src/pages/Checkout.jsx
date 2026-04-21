import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, removeFromCart, getCartTotal, setCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // TODO: Implement order creation logic here
      console.log("Processing order for items:", cart);
      alert("Order placed successfully! Thank you for your purchase.");
      // After successful checkout, clear cart and redirect
      setTimeout(() => {
        setCart([]);
        navigate("/");
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      setIsProcessing(false);
    }
  };

  const cartTotal = getCartTotal();
  console.log(cart);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review and complete your order</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {cart && cart.length > 0 ? (
              <div className="space-y-4">
                {/* Cart Items */}
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      {item.imageUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-blue-600">
                            ${parseFloat(item.price).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Stock: {item.stock || "In stock"}
                          </div>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="mt-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 10m10 0h2m-2 0l2-10M9 6h6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Add some products to get started!
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6 border-b pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span className="font-semibold">
                    ${(cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${(cartTotal + cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items Count */}
              <div className="mb-6 text-sm text-gray-600">
                <p>
                  {cart.length} {cart.length === 1 ? "item" : "items"} in cart
                </p>
              </div>

              {/* Checkout Button */}
              {cart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                    isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>
              )}

              {/* Continue Shopping */}
              {cart.length > 0 && (
                <button
                  onClick={() => navigate("/products")}
                  className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
                >
                  Continue Shopping
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
