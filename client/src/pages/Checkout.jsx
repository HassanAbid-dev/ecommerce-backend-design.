import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../api/axiosInstance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ─── Card style to match your existing blue theme ───────────────────────────
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: "inherit",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

// ─── Inner form — has access to Stripe hooks ─────────────────────────────────
const CheckoutForm = ({
  cart,
  removeFromCart,
  getCartTotal,
  setCart,
  handleQuantityChange,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cartTotal = getCartTotal();

  const handleCheckout = async () => {
    if (!stripe || !elements) return;
    if (cart.length === 0) return;

    setIsProcessing(true);
    setCardError("");

    try {
      // Step 1: Send cart to backend → get clientSecret
      const { data } = await axiosInstance.post(
        "/payment/create-payment-intent",
        {
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      );

      // Step 2: Confirm card payment using Stripe.js
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (error) {
        setCardError(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        setCart([]);
        setTimeout(() => navigate("/"), 2500);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setCardError("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment successful!
          </h2>
          <p className="text-gray-600">
            Your order has been placed. Redirecting you home...
          </p>
        </div>
      </div>
    );
  }

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
          <div className="lg:col-span-2 space-y-4">
            {cart && cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex gap-6">
                      {item.imageUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
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
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
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

                {/* ── Card input section ── */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment details
                  </h2>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                  {cardError && (
                    <p className="mt-3 text-sm text-red-600">{cardError}</p>
                  )}
                  <p className="mt-3 text-xs text-gray-400">
                    Test card: 4242 4242 4242 4242 — any future expiry — any CVC
                  </p>
                </div>
              </>
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

              <div className="mb-6 text-sm text-gray-600">
                <p>
                  {cart.length} {cart.length === 1 ? "item" : "items"} in cart
                </p>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || !stripe}
                  className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                    isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </button>
              )}

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

// ─── Outer wrapper — provides Stripe context ──────────────────────────────────
const Checkout = () => {
  const { cart, removeFromCart, getCartTotal, setCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        cart={cart}
        removeFromCart={removeFromCart}
        getCartTotal={getCartTotal}
        setCart={setCart}
        handleQuantityChange={handleQuantityChange}
      />
    </Elements>
  );
};

export default Checkout;
