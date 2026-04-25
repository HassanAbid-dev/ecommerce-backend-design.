import Order from "../models/Order.js";
import sendEmail from "../utils/sendEmail.js";

const statusMessages = {
  paid: {
    subject: "Order Confirmed — Payment Received",
    color: "#16a34a",
    heading: "Your order has been confirmed!",
    message:
      "Great news! Your payment has been received and your order is confirmed.",
  },
  failed: {
    subject: "Order Update — Payment Failed",
    color: "#dc2626",
    heading: "Payment failed",
    message:
      "Unfortunately your payment could not be processed. Please contact support.",
  },
  pending: {
    subject: "Order Update — Payment Pending",
    color: "#d97706",
    heading: "Your order is pending",
    message:
      "Your order is currently pending. We will update you once it is confirmed.",
  },
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("user", "username email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Send response FIRST
    res.json(order);

    // ✅ Send email in background (after response)
    const template = statusMessages[status];
    if (template && order.user?.email) {
      const itemsList = order.items
        .map(
          (item) => `
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0f0f0">${item.name}</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:center">x${item.quantity}</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`,
        )
        .join("");

      sendEmail({
        to: order.user.email,
        subject: template.subject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
            <div style="background:${template.color};padding:24px;border-radius:8px 8px 0 0;text-align:center">
              <h1 style="color:white;margin:0;font-size:22px">${template.heading}</h1>
            </div>
            <div style="background:#ffffff;padding:24px;border:1px solid #e5e7eb;border-top:none">
              <p style="color:#374151;font-size:15px">Hi ${order.user.username},</p>
              <p style="color:#374151;font-size:15px">${template.message}</p>
              <div style="background:#f9fafb;padding:16px;border-radius:8px;margin:20px 0">
                <p style="margin:0 0 12px;font-weight:bold;color:#111827">Order details</p>
                <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151">
                  <thead>
                    <tr>
                      <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #e5e7eb">Item</th>
                      <th style="text-align:center;padding-bottom:8px;border-bottom:2px solid #e5e7eb">Qty</th>
                      <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #e5e7eb">Price</th>
                    </tr>
                  </thead>
                  <tbody>${itemsList}</tbody>
                </table>
                <div style="text-align:right;margin-top:12px;font-weight:bold;font-size:16px;color:#111827">
                  Total: $${order.totalAmount.toFixed(2)}
                </div>
              </div>
              <p style="color:#6b7280;font-size:13px">
                Order ID: ${order._id}<br/>
                Date: ${new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div style="background:#f9fafb;padding:16px;border-radius:0 0 8px 8px;text-align:center;border:1px solid #e5e7eb;border-top:none">
              <p style="color:#9ca3af;font-size:12px;margin:0">Thank you for shopping with us!</p>
            </div>
          </div>
        `,
      }).catch((err) => console.error("Email error:", err)); // log but don't crash
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
