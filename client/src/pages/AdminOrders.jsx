import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get("/orders");
      setOrders(data);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Access denied. Admins only.");
      } else if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const { data } = await axiosInstance.patch(`/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data : order)),
      );
    } catch (err) {
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin — Orders
          </h1>
          <p className="text-gray-600">
            {orders.length} total order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {["pending", "paid", "failed"].map((s) => (
            <div
              key={s}
              className="bg-white rounded-lg shadow-md p-4 text-center"
            >
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === s).length}
              </p>
              <p
                className={`text-sm font-medium mt-1 capitalize px-2 py-0.5 rounded-full inline-block ${statusColors[s]}`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Order info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-400 font-mono">
                        {order._id}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* User */}
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Customer:</span>{" "}
                      {order.user?.username || "Unknown"} —{" "}
                      {order.user?.email || ""}
                    </p>

                    {/* Items */}
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Items:</span>{" "}
                      {order.items
                        .map((i) => `${i.name} ×${i.quantity}`)
                        .join(", ")}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Total + actions */}
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-2xl font-bold text-blue-600">
                      ${order.totalAmount.toFixed(2)}
                    </p>

                    {/* Status buttons */}
                    <div className="flex gap-2">
                      {order.status !== "paid" && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, "paid")}
                          disabled={updatingId === order._id}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                          {updatingId === order._id
                            ? "Updating..."
                            : "Mark as paid"}
                        </button>
                      )}
                      {order.status !== "pending" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(order._id, "pending")
                          }
                          disabled={updatingId === order._id}
                          className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                        >
                          Mark as pending
                        </button>
                      )}
                      {order.status !== "failed" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(order._id, "failed")
                          }
                          disabled={updatingId === order._id}
                          className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                        >
                          Mark as failed
                        </button>
                      )}
                    </div>
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

export default AdminOrders;
